module.exports = {
  plugins: [
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'posts',
        contentPath: 'content/posts',
        fullRelativePath: false,
        mdxOtherwiseConfigured: true,
        // This option has no effect other than that it passed through to page templates.
        tagCollection: 'posts/tags',
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'notes',
        contentPath: 'content/notes',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
        tagCollection: 'notes',
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-pages-core',
      options: {
        contentPath: 'content/pages',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // This config results in tage pages being shifted down one level.
        tagCollection: 'posts/tags',
        mdxCollections: ['posts'],
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: {
        // This config results in overwriting the notes page with the tags page.
        tagCollection: 'notes',
        mdxCollections: ['notes'],
      },
    },
    'gatsby-plugin-mdx',
    '@maiertech/gatsby-theme-base',
    '@maiertech/gatsby-theme-theme-ui',
  ],
};
