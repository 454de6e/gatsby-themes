module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: { prismPreset: 'prism', preset: '@maiertech/preset' },
    },
  ],
};
