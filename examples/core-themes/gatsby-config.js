module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: '@maiertech/gatsby-theme-pages-core',
      options: {
        contentPath: 'content/pages',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'posts',
        contentPath: 'content/posts',
        fullRelativePath: false,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'news',
        contentPath: 'content/news',
        fullRelativePath: false,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-posts-core',
      options: {
        collection: 'notes',
        contentPath: 'content/notes',
        fullRelativePath: true,
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: { tagCollection: 'tags', mdxCollections: ['posts', 'news'] },
    },
    {
      resolve: '@maiertech/gatsby-theme-tags-core',
      options: { tagCollection: 'notes/tags', mdxCollections: ['notes'] },
    },
  ],
};
