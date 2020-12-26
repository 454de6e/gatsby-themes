const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

// This Webpack config helps prevent this error: https://github.com/gatsbyjs/gatsby/issues/24815.
// It is caused when using @maiertech/gatsby-helpers inside use-posts.js.
// See https://www.gatsbyjs.com/docs/troubleshooting-common-errors/#issues-with-fs-resolution.
/* istanbul ignore next */
module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  });
};

/* istanbul ignore next */
module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

/* istanbul ignore next */
module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    interface Post @nodeInterface {
      id: ID!
      collection: String!
      title: String!
      author: String
      date: Date @dateformat
      description: String!
      tags: [String!]
      body: String!
      path: String!
    }

    type MdxPost implements Node & Post {
      id: ID!
      collection: String!
      title: String!
      author: String
      date: Date @dateformat
      description: String!
      tags: [String!]
      body: String!
      path: String!
    }
  `);
};

/* istanbul ignore next */
module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxPost: { body: { resolve: mdxResolverPassthrough('body') } },
  });
};

module.exports.onCreateNode = (
  { actions, node, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { basePath, collection, fullRelativePath } = withDefaults(themeOptions);

  // Process MDX nodes only.
  if (node.internal.type !== 'Mdx') {
    return;
  }

  // Parent (file node) makes `name` option from `gatsby-source-filesystem` available as `sourceInstanceName`.
  // Process nodes from same collection only.
  const parent = getNode(node.parent);
  if (parent.sourceInstanceName !== collection) {
    return;
  }

  const { relativeDirectory } = parent;

  const nodeData = {
    ...node.frontmatter,
    collection,
    path: createPath(
      basePath,
      collection,
      // Decide whether or not to omit relativeDirectory in path.
      fullRelativePath ? relativeDirectory : '',
      slugify(node.frontmatter.title)
    ),
  };

  const nodeType = 'MdxPost';

  actions.createNode({
    id: createNodeId(`${nodeType}-${collection}-${node.id}`),
    parent: node.id,
    ...nodeData,
    internal: {
      type: nodeType,
      contentDigest: createContentDigest(node.internal.contentDigest),
    },
  });

  // Add collection to Mdx node.
  actions.createNodeField({
    node,
    name: 'collection',
    value: collection,
  });

  // Add path to Mdx node.
  actions.createNodeField({
    node,
    name: 'path',
    value: nodeData.path,
  });
};

// Cannot be replaced by File System Route API since theme option `collection` is part of path of generated pages.
module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const { createPage } = actions;
  const options = withDefaults(themeOptions);
  const { basePath, collection } = options;

  // Query all posts that belong to the same collection.
  // Sort order matters to determine next and previous posts.
  const result = await graphql(
    `
      query($collection: String!) {
        allPost(
          sort: { fields: date, order: DESC }
          filter: { collection: { eq: $collection } }
        ) {
          nodes {
            id
            path
          }
        }
      }
    `,
    { collection }
  );

  if (result.errors) {
    reporter.error('There was an error fetching posts.', result.errors);
    return;
  }

  const posts = result.data.allPost.nodes;

  // Create posts page.
  createPage({
    path: createPath(basePath, collection),
    component: require.resolve('./src/templates/posts-query.js'),
    context: {
      collection,
      themeOptions: options,
    },
  });

  // Create post pages
  posts.forEach((node, index) => {
    actions.createPage({
      path: node.path,
      component: require.resolve('./src/templates/post-query.js'),
      context: {
        id: node.id,
        prev: index === 0 ? null : posts[index - 1].id,
        next: index === posts.length - 1 ? null : posts[index + 1].id,
        themeOptions: options,
      },
    });
  });
};
