const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { collection, contentPath, mdxOtherwiseConfigured } = withDefaults(
    themeOptions
  );
  return {
    plugins: [
      !mdxOtherwiseConfigured && { resolve: 'gatsby-plugin-mdx', options: {} },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: collection,
          path: contentPath,
        },
      },
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
    ].filter(Boolean),
  };
};
