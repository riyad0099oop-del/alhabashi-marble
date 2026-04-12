export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://alhabashi-marble.vercel.app/sitemap.xml',
  }
}
