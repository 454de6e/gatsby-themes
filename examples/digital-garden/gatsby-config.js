module.exports = {
  siteMetadata: {
    siteTitle: "Thilo's Digital Garden",
    seoTitle: "Thilo Maier's Digital Garden",
    siteAuthor: 'Thilo Maier',
    siteDescription:
      '@maiertech/gatsby-theme-digital-garden is a Gatsby theme to help you build your own digital garden.',
    siteNavLinks: [
      { href: '/posts/', text: 'Posts' },
      { href: '/chunks/', text: 'Chunks' },
      { href: '/notes/', text: 'Notes' },
      { href: '/about/', text: 'About' },
    ],
    siteTwitter: 'maiertech',
    siteUrl: 'https://digital-garden.themes.maier.tech',
  },
  plugins: ['@maiertech/gatsby-theme-digital-garden'],
};
