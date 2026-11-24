export function categoryFor(post) {
  const text = `${post.title || ''} ${post.content || ''} ${post.location || ''}`;
  if (text.includes('醫診到會')) return 'medical-visit';
  if (/義診|醫療|眼科|中醫|心血管|篩查/.test(text)) return 'medical';
  if (/慈善服裝展|成立|創會|籌款/.test(text)) return 'milestone';
  return 'community';
}

export function categoryName(key) {
  return ({
    'medical-visit': '醫診到會',
    medical: '專科義診',
    community: '社區關懷',
    milestone: '重大盛事',
  })[key] || '協會動向';
}

export function simplifyTitle(title) {
  if (!title) return '香港愛馬女士協會活動';
  return title
    .replace(/\s*[\(（][^)）]*[\)）]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
