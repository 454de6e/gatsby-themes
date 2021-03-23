const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

// createPath and ensurePathExists from @maiertech/gatsby-helpers use fs and path from the Node API.
// They cannot be run in the browser without a polyfill.
// In digital-garden-example shadowed post-page.js uses createPath from the gatsby-helpers, which triggers a Webpack error in development.
// Therefore, we need to load a polyfill.
/* istanbul ignore next */
module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve('path-browserify'),
      },
      fallback: { fs: false },
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
    interface Post implements Node {
      id: ID!
      collection: String!
      title: String!
      author: String
      date: Date @dateformat
      description: String!
      tags: [String!]
      images: [File!]
      body: String!
      path: String!
      canonicalUrl: String
    }

    type MdxPost implements Node & Post {
      id: ID!
      collection: String!
      title: String!
      author: String
      date: Date @dateformat
      description: String!
      tags: [String!]
      images: [File!] @fileByRelativePath
      body: String!
      path: String!
      canonicalUrl: String
    }
  `);
};

/* istanbul ignore next */
module.exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    MdxPost: {
      body: {
        // Resolver has no arguments.
        resolve: mdxResolverPassthrough('body'),
      },
    },
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
    // Rename canonical_url to canonicalUrl
    canonicalUrl: node.frontmatter.canonical_url,
    canonical_url: undefined,
    collection,
    path: createPath(
      basePath,
      collection,
      // Decide whether or not to omit relativeDirectory in path.
      fullRelativePath ? relativeDirectory : '',
      node.frontmatter.slug || slugify(node.frontmatter.title)
    ),
    // slug in frontmatter is not needed in MdxPost.
    slug: undefined,
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

// This Node API method cannot be replaced with File System Route API since we need to add the following info to context:
// - prev and next for navigation between tweets.
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
            title
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
    component: require.resolve('./src/templates/posts.js'),
    context: {
      collection,
      themeOptions: options,
    },
  });

  // Create post pages
  posts.forEach((node, index) => {
    actions.createPage({
      path: node.path,
      component: require.resolve('./src/templates/post.js'),
      context: {
        id: node.id,
        prev: posts[index - 1],
        next: posts[index + 1],
        themeOptions: options,
      },
    });
  });
};
