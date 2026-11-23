const $ = (s, root=document) => root.querySelector(s);
const menuButton = $('.menu-toggle');
const menu = $('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
const dialog = $('.lightbox');
$('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const excerpt = s => (s || '').replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/顯示較少|顯示更多|\+\d+/g, '').trim();
const categoryFor = post => {
  const text = `${post.title || ''} ${post.content || ''}`;
  if (/義診|醫療|眼科|中醫|心血管|篩查/.test(text)) return 'medical';
  if (/慈善服裝展|成立|創會|籌款/.test(text)) return 'milestone';
  return 'community';
};
const categoryName = key => ({medical:'專科義診',community:'社區關懷',milestone:'重大盛事'}[key] || '協會動向');
const getDate = post => {
  const year = (post.content || '').match(/20(?:1[7-9]|2[0-9])年/);
  return year ? `${year[0].replace('年','')} · ${post.date || ''}` : post.date || '協會活動';
};
fetch('assets/facebook_data.json').then(r => r.json()).then(data => {
  const posts = data.posts || [];
  const selected = posts.slice(0, 21);
  $('#news-list').innerHTML = selected.map(post => {
    const category = categoryFor(post);
    const image = post.images?.[0]?.src || data.organization?.coverPhotoUrl || '';
    const content = excerpt(post.content).replace(post.title || '', '').slice(0, 150);
    return `<article class="news-card" data-category="${category}"><div class="news-photo"><img src="${esc(image)}" alt="${esc(post.title || '協會活動照片')}" loading="lazy"><span class="news-tag">${categoryName(category)}</span></div><div class="news-copy"><div class="news-meta">${esc(getDate(post))}</div><h3>${esc(post.title || '香港愛馬女士協會活動')}</h3><p>${esc(content || post.location || '香港愛馬女士協會與社區伙伴同行，持續推動健康服務及長者關懷。')}</p><a href="https://www.facebook.com/hkalhl.org" target="_blank" rel="noreferrer">閱讀活動詳情 <span>↗</span></a></div></article>`;
  }).join('');
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active'); button.classList.add('active');
    document.querySelectorAll('.news-card').forEach(card => card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter);
  }));
  const photos = [];
  posts.forEach(post => (post.images || []).forEach(image => {
    if (image?.src && photos.length < 5 && !photos.some(p => p.src === image.src)) photos.push({src:image.src, alt:post.title || '香港愛馬女士協會活動'});
  }));
  if (photos.length) $('#gallery-grid').innerHTML = photos.map((photo, i) => `<button class="gallery-item" type="button" data-src="${esc(photo.src)}" data-alt="${esc(photo.alt)}" aria-label="放大活動相片 ${i+1}"><img src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy"></button>`).join('');
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    $('img', dialog).src = item.dataset.src; $('img', dialog).alt = item.dataset.alt; $('p', dialog).textContent = item.dataset.alt; dialog.showModal();
  }));
}).catch(() => {
  $('#news-list').innerHTML = '<p class="loading">歡迎瀏覽協會 Facebook 專頁，了解最新服務與活動。</p>';
});
