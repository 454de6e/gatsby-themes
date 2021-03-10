const withDefaults = require('./theme-options');

module.exports = (themeOptions) => {
  const { basePath } = withDefaults(themeOptions);
  return {
    plugins: [
      {
        resolve: '@maiertech/gatsby-theme-posts-core',
        options: {
          basePath,
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: true,
          // The following options have no effect other than that they are passed through to page templates.
          tagCollection: 'tags',
          type: 'post',
        },
      },
      {
        resolve: '@maiertech/gatsby-theme-posts-core',
        options: {
          basePath,
          collection: 'chunks',
          contentPath: 'content/chunks',
          fullRelativePath: false,
          mdxOtherwiseConfigured: true,
          // The following options have no effect other than that they are passed through to page templates.
          tagCollection: 'tags',
          type: 'chunk',
        },
      },
      {
        resolve: '@maiertech/gatsby-theme-posts-core',
        options: {
          basePath,
          collection: 'notes',
          contentPath: 'content/notes',
          fullRelativePath: true,
          mdxOtherwiseConfigured: true,
          // The following options have no effect other than that they are passed through to page templates.
          tagCollection: 'notes',
        },
      },
      {
        resolve: '@maiertech/gatsby-theme-pages-core',
        options: {
          basePath,
          contentPath: 'content/pages',
          fullRelativePath: true,
          mdxOtherwiseConfigured: true,
        },
      },
      {
        resolve: '@maiertech/gatsby-theme-tags-core',
        options: {
          basePath,
          // This config results in tage pages being shifted down one level.
          // tagCollection: 'tags',
          mdxCollections: ['posts', 'chunks'],
        },
      },
      {
        resolve: '@maiertech/gatsby-theme-tags-core',
        options: {
          basePath,
          // This config results in overwriting the notes page with the tags page.
          tagCollection: 'notes',
          mdxCollections: ['notes'],
        },
      },
      'gatsby-plugin-mdx',
      'gatsby-plugin-image',
      '@maiertech/gatsby-theme-base',
      '@maiertech/gatsby-theme-theme-ui',
      {
        resolve: 'gatsby-plugin-sitemap',
        options: { exclude: ['/notes/**/*', '/notes/'] },
      },
    ],
  };
};
