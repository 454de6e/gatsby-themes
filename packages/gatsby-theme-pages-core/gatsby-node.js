const {
  createPath,
  ensurePathExists,
  mdxResolverPassthrough,
  slugify,
} = require('@maiertech/gatsby-helpers');

const withDefaults = require('./theme-options');

/* istanbul ignore next */
module.exports.onPreBootstrap = ({ reporter }, themeOptions) => {
  const { contentPath } = withDefaults(themeOptions);
  ensurePathExists(contentPath, reporter);
};

/* istanbul ignore next */
module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
      interface Page @nodeInterface {
        id: ID!
        title: String!
        description: String!
        images: [File!]
        body: String!
        path: String!
        canonicalUrl: String
      }
      type MdxPage implements Node & Page {
        id: ID!
        title: String!
        description: String!
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
    MdxPage: { body: { resolve: mdxResolverPassthrough('body') } },
  });
};

module.exports.onCreateNode = (
  { node, actions, getNode, createNodeId, createContentDigest },
  themeOptions
) => {
  const { basePath, fullRelativePath } = withDefaults(themeOptions);

  // Process MDX nodes only.
  if (node.internal.type !== 'Mdx') {
    return;
  }

  // Parent (file node) makes `name` option from `gatsby-source-filesystem` available as `sourceInstanceName`.
  // Process nodes from `pages` collection only.
  const parent = getNode(node.parent);
  if (parent.sourceInstanceName !== `pages`) {
    return;
  }

  const { relativeDirectory } = parent;

  const nodeData = {
    ...node.frontmatter,
    // Rename canonical_url to canonicalUrl
    canonicalUrl: node.frontmatter.canonical_url,
    // eslint-disable-next-line babel/camelcase
    canonical_url: undefined,
    path: createPath(
      basePath,
      // Decide whether or not to omit relativeDirectory in path.
      fullRelativePath ? relativeDirectory : '',
      node.frontmatter.slug || slugify(node.frontmatter.title)
    ),
    // Set unneeded prop to undefined.
    slug: undefined,
  };

  const nodeType = 'MdxPage';

  actions.createNode({
    id: createNodeId(`${nodeType}-pages-${node.id}`),
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
    value: 'pages',
  });

  // Add path to Mdx node.
  actions.createNodeField({
    node,
    name: 'path',
    value: nodeData.path,
  });
};

module.exports.createPages = async (
  { actions, graphql, reporter },
  themeOptions
) => {
  const options = withDefaults(themeOptions);

  const result = await graphql(`
    query {
      allPage {
        nodes {
          id
          path
        }
      }
    }
  `);

  if (result.errors) {
    reporter.error('There was an error fetching pages.', result.errors);
    return;
  }

  const pages = result.data.allPage.nodes;

  pages.forEach(({ id, path }) => {
    actions.createPage({
      path,
      component: require.resolve('./src/template.js'),
      context: {
        id,
        themeOptions: options,
      },
    });
  });
};
