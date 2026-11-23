import fs from "node:fs/promises";
import path from "node:path";

const TARGET_URL = "https://www.facebook.com/share/1Ha4a5W89g/?mibextid=wwXIfr";
const OUTPUT_FILE = "/Users/brianlee/projects/websites/facebook_image_posts.json";
const DATA_FILE = "/Users/brianlee/projects/websites/facebook_data.json";

console.log(`Starting extraction of image posts from: ${TARGET_URL}`);

const task = await taskSpace("extract all image posts");
const page = task.page("p1");

try {
  await page.goto(TARGET_URL);
  await page.waitForTimeout(4000);

  const currentUrl = await page.url();
  console.log(`Redirected to: ${currentUrl}`);

  const postMap = new Map();
  let scrollStep = 0;
  let consecutiveNoNewPosts = 0;
  const MAX_SCROLLS = 70; // Facebook page has ~40-60 posts across its history
  const MAX_IDLE_SCROLLS = 8; // If no new posts found 8 times in a row, assume end

  while (scrollStep < MAX_SCROLLS) {
    scrollStep++;

    // 1. Expand all visible "查看更多" (See more) buttons
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('div[role="button"], span'));
      for (const b of buttons) {
        const txt = (b.innerText || '').trim();
        if (txt === '查看更多' || txt === 'See more') {
          try { b.click(); } catch(e) {}
        }
      }
    });

    // 2. Extract articles currently in DOM
    const batch = await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('div[role="article"]'));
      const results = [];

      for (const art of articles) {
        const fullText = (art.innerText || '').trim();
        if (!fullText || fullText.length < 25) continue;

        // Skip non-HKALHL articles if any feed suggestions appear
        if (!fullText.includes('香港愛馬女士協會') && !fullText.includes('hkalhl')) {
          continue;
        }

        // --- RULE 1: Skip posts with videos ---
        const hasVideoTag = !!art.querySelector('video');
        const hasVideoAttr = !!art.querySelector('[data-video-id], [data-video-url], [data-video-channel-id]');
        const hasVideoLink = !!art.querySelector('a[href*="/videos/"], a[href*="/watch"], a[href*="/reel/"]');
        const hasVideoText = /新增了.*部影片|發佈了一段影片|新增了.*個短片|Reels/i.test(fullText.slice(0, 160));
        const hasPlayButton = !!art.querySelector('div[aria-label="播放影片"], div[aria-label="Play video"], div[aria-label="播放"]');

        if (hasVideoTag || hasVideoAttr || hasVideoLink || hasVideoText || hasPlayButton) {
          continue;
        }

        // --- RULE 2: Skip posts with external URLs ---
        // Look for link share cards or l.facebook.com links pointing outside
        const externalLinks = Array.from(art.querySelectorAll('a[href*="l.facebook.com/l.php"]'))
          .map(a => {
            try {
              const u = new URL(a.href).searchParams.get('u');
              return u;
            } catch(e) { return null; }
          })
          .filter(u => u && !u.includes('hkalhl.org') && !u.includes('facebook.com'));

        if (externalLinks.length > 0) {
          continue;
        }

        // --- RULE 3: Must be an image post (has post photos) ---
        const imgElements = Array.from(art.querySelectorAll('img')).filter(img => {
          const src = img.src || '';
          if (!src.includes('scontent') && !src.includes('fbcdn.net')) return false;
          if (src.includes('/rsrc.php/') || src.includes('emoji.php')) return false;

          // Exclude small avatars, reaction emojis, or author badge icons
          const isAvatar = img.closest('a[aria-label*="個人檔案"]') ||
                           img.closest('svg image') ||
                           (img.width <= 70 && img.height <= 70 && !img.closest('a[href*="/photo"]'));

          // True post image usually has width/height > 100 or is inside photo permalink
          return !isAvatar && (img.width > 90 || img.height > 90 || img.naturalWidth > 90 || img.closest('a[href*="/photo"]'));
        });

        if (imgElements.length === 0) {
          continue; // No images -> skip
        }

        // Extract deduplicated image URLs
        const images = [];
        const seenSrc = new Set();
        for (const img of imgElements) {
          const rawSrc = img.src;
          const baseUrl = rawSrc.split('?')[0];
          if (!seenSrc.has(baseUrl)) {
            seenSrc.add(baseUrl);
            images.push({
              src: rawSrc,
              alt: img.alt || '',
              width: img.naturalWidth || img.width || 0,
              height: img.naturalHeight || img.height || 0
            });
          }
        }

        // Clean post text (remove Facebook action buttons and UI boilerplate)
        let lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
        lines = lines.filter(l => 
          !l.includes('以 Brian Lee 的身分回應') &&
          !l.includes('分享的帖子') &&
          !l.startsWith('未提供相片說明') &&
          !l.startsWith('可能是') &&
          !['讚好', '留言', '分享', '顯示較少', '查看更多', '建立帖子', '篩選條件'].includes(l) &&
          !l.match(/^\+\d+$/) // like "+14", "+8"
        );
        const cleanContent = lines.join('\n');

        // Extract potential post permalink
        const permalinkAnchor = art.querySelector('a[href*="/posts/"], a[href*="set=pcb."], a[href*="/photo/"]');
        const postUrl = permalinkAnchor ? permalinkAnchor.href : '';

        // Extract date and location
        let date = '';
        let location = '';
        let title = '';

        for (const line of lines) {
          if (line.match(/20\d\d年\d+月\d+日/) || line.match(/^\d+月\d+日/)) {
            if (!date) date = line;
          }
          if (line.includes('— 在') || line.includes('在聖公會聖十架小學') || line.includes('在樂華社區中心禮堂') || line.includes('在摩頓臺活動中心')) {
            location = line;
          }
          if ((line.startsWith('【') && line.includes('】')) || (line.startsWith('「') && line.includes('」'))) {
            if (!title) title = line;
          }
        }

        results.push({
          title: title || lines[0] || '香港愛馬女士協會活動',
          date,
          location,
          cleanContent,
          lines,
          postUrl,
          images
        });
      }

      return results;
    });

    let newInThisBatch = 0;
    for (const item of batch) {
      // Use cleanContent first 100 characters as the unique key
      const key = item.cleanContent.slice(0, 100);
      if (!postMap.has(key)) {
        postMap.set(key, item);
        newInThisBatch++;
      }
    }

    if (newInThisBatch === 0) {
      consecutiveNoNewPosts++;
    } else {
      consecutiveNoNewPosts = 0;
    }

    if (scrollStep % 5 === 0 || consecutiveNoNewPosts > 0) {
      console.log(`Scroll ${scrollStep}: Total collected = ${postMap.size} posts (new this step: ${newInThisBatch}, idle: ${consecutiveNoNewPosts})`);
    }

    if (consecutiveNoNewPosts >= MAX_IDLE_SCROLLS) {
      console.log(`No new posts found for ${MAX_IDLE_SCROLLS} consecutive scrolls. Reached the end of feed.`);
      break;
    }

    // Scroll down
    await page.mouse.wheel(0, 2200);
    await page.waitForTimeout(1100);
  }

  const allPosts = Array.from(postMap.values()).map((p, idx) => ({
    id: `post-${idx + 1}`,
    title: p.title,
    date: p.date,
    location: p.location,
    content: p.cleanContent,
    postUrl: p.postUrl,
    imageCount: p.images.length,
    images: p.images
  }));

  console.log(`\n========================================`);
  console.log(`EXTRACTION COMPLETED`);
  console.log(`Total Image Posts Extracted: ${allPosts.length}`);
  console.log(`========================================\n`);

  // Save to facebook_image_posts.json
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(allPosts, null, 2), "utf-8");
  console.log(`Saved extracted image posts to: ${OUTPUT_FILE}`);

  // Also update facebook_data.json
  try {
    const rawData = await fs.readFile(DATA_FILE, "utf-8");
    const fullData = JSON.parse(rawData);
    fullData.posts = allPosts;
    await fs.writeFile(DATA_FILE, JSON.stringify(fullData, null, 2), "utf-8");
    console.log(`Updated posts in: ${DATA_FILE}`);
  } catch(e) {
    console.warn(`Could not update ${DATA_FILE}:`, e.message);
  }

} finally {
  await task.finish({ keep: [] });
  console.log("Browser task finished cleanly.");
}
