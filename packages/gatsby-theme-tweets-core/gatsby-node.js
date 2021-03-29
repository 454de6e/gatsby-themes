const {
  createPath,
  ensurePathExists,
  filter,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

// createPath and ensurePathExists from @maiertech/gatsby-helpers use fs and path from the Node API.
// They cannot be run in the browser without a polyfill.
// digital-garden-example shadows tweet-page.js and uses createPath from gatsby-helpers, which triggers a Webpack error in development.
// Therefore, we need to load a polyfill.
/* istanbul ignore next */
exports.onCreateWebpackConfig = ({ actions }) => {
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
exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

/* istanbul ignore next */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type TweetImage {
      src: File! @fileByRelativePath
      title: String
      alt: String!
    }

    type TweetResource {
      title: String!
      href: String!
    }

    interface Tweet implements Node {
      id: ID!
      collection: String!
      title: String!
      user: String
      description: String!
      url: String!
      thread: String
      tags: [String!]
      images: [TweetImage!]
      links: [TweetResource!]
      body: String!
      path: String!
    }

    type MdxTweet implements Node & Tweet {
      id: ID!
      collection: String!
      title: String!
      user: String
      description: String!
      url: String!
      thread: String
      tags: [String!]
      images: [TweetImage!]
      links: [TweetResource!]
      body: String!
      path: String!
    }
  `);
};

/* istanbul ignore next */
exports.createResolvers = ({ createResolvers }, themeOptions) => {
  const { pruneLength } = withDefaults(themeOptions);
  createResolvers({
    MdxTweet: {
      body: { resolve: mdxResolverPassthrough('body') },
      description: {
        // Create resolver with default arg pruneLength from theme options.
        resolve: mdxResolverPassthrough('excerpt', {
          pruneLength,
        }),
      },
    },
  });
};

exports.onCreateNode = (
  { actions, node, getNode, createContentDigest },
  themeOptions
) => {
  const { collection, fullRelativePath } = withDefaults(themeOptions);

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
      collection,
      // Decide whether or not to omit relativeDirectory in path.
      fullRelativePath ? relativeDirectory : '',
      node.frontmatter.slug ||
        slugify(node.frontmatter.title, { decamelize: false })
    ),
    // slug from frontmatter is not needed in MdxTweet.
    slug: undefined,
  };

  const nodeType = 'MdxTweet';

  actions.createNode({
    // ID is spread in from nodeData.
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

// This Node API method cannot be replaced with the File System Route API since we need to add the following info to context:
// - prev and next for navigation between tweets and
// - grouping thread for intra thread navigation.
exports.createPages = async (
  { actions, graphql, pathPrefix, reporter },
  themeOptions
) => {
  const { createPage } = actions;
  const options = withDefaults(themeOptions);
  const { collection } = options;

  // Query all tweets that belong to the same collection.
  // Sort order matters to determine next and prev tweets.
  // Since fragments are not supported in gatsby-node.js, we cannot use TweetFragment here.
  const result = await graphql(
    `
      query($collection: String!) {
        allTweet(
          sort: { fields: id, order: DESC }
          filter: { collection: { eq: $collection } }
        ) {
          nodes {
            id
            title
            thread
            path
          }
        }
      }
    `,
    { collection }
  );

  if (result.errors) {
    reporter.error('There was an error fetching tweets.', result.errors);
    return;
  }

  const tweets = result.data.allTweet.nodes;

  // Create tweets page.
  createPage({
    path: createPath(pathPrefix, collection),
    component: require.resolve('./src/templates/tweets.js'),
    context: {
      // collection is required for GraphQL query.
      collection,
      // theme options are required in shadowed page components.
      themeOptions: options,
    },
  });

  // Create tweet pages.
  tweets.forEach((tweet, i) => {
    // Determine tweets that are part of the same thread.
    let thread;
    if (tweet.thread) {
      thread = filter(tweets, { thread: tweet.thread }).reverse();
    }
    actions.createPage({
      path: tweet.path,
      component: require.resolve('./src/templates/tweet.js'),
      context: {
        id: tweet.id,
        thread,
        prev: tweets[i - 1],
        next: tweets[i + 1],
        // Make pathPrefix available so shadowed templates can link to tag pages.
        pathPrefix,
        themeOptions: options,
      },
    });
  });
};
