export function categoryFor(post) {
  const title = post.title || "";
  const text = `${title} ${post.content || ""} ${post.location || ""}`;
  if (text.includes("醫診到會")) return "medical-visit";
  if (/義診|醫療|眼科|中醫|心血管|篩查/.test(text)) return "medical";
  if (/慈善服裝展|成立|創會|籌款/.test(text)) return "milestone";
  if (/情暖銀齡|銀齡|耆樂|長者|福袋/.test(title)) return "elderly";
  if (/學童|青少年|青春|學界|樂童|小朋友|童慶|匡智|VTC|朋輩/.test(title))
    return "youth";
  return "community";
}

export function categoryName(key) {
  return (
    {
      "medical-visit": "醫診到會",
      medical: "專科義診",
      elderly: "情暖銀齡",
      youth: "兒童青少年",
      community: "社區關懷",
      milestone: "重大盛事",
    }[key] || "協會動向"
  );
}

export function simplifyTitle(title) {
  if (!title) return "香港愛馬女士協會活動";
  return title
    .replace(/\s*[\(（][^)）]*[\)）]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function cleanContent(content) {
  if (!content) return "";
  const lines = content.split(/\r?\n/).map((line) => line.trim());
  let start = 0;
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    if (lines[i] === "·") start = i + 1;
  }
  const body = lines.slice(start);
  while (
    body.length &&
    (body[body.length - 1] === "" ||
      /^(\+\d+|\d+|顯示較少)$/.test(body[body.length - 1]))
  ) {
    body.pop();
  }
  if (body.length) {
    body[body.length - 1] = body[body.length - 1]
      .replace(/\s*顯示較少$/, "")
      .trim();
  }
  return body.filter(Boolean).join("\n");
}
