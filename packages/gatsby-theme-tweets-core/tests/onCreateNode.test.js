const { onCreateNode } = require('../gatsby-node');

describe('onCreateNode', () => {
  let actions;
  let createContentDigest;
  let getNode;

  beforeAll(() => {
    // Create spies.
    getNode = jest.fn();
    actions = { createNode: jest.fn(), createNodeField: jest.fn() };

    // Create mock.
    createContentDigest = () => 'digest';
  });

  beforeEach(() => {
    // Clear spies before each test.
    actions.createNode.mockClear();
    actions.createNodeField.mockClear();
    getNode.mockClear();
  });

  it('process node which is not Mdx', () => {
    onCreateNode({
      actions,
      node: { internal: { type: 'NotMdx' } },
      getNode,
      createContentDigest,
    });
    expect(getNode).not.toHaveBeenCalled();
    expect(actions.createNode).not.toHaveBeenCalled();
  });

  it('process Mdx node from wrong collection', () => {
    // Theme option `collection` is passed into gatsby-source-filesystem.
    // This test checks that the createNode action does not run when the processed node is from a different collection.
    onCreateNode(
      {
        actions,
        node: { internal: { type: 'Mdx' } },
        getNode: () => ({
          sourceInstanceName: 'toots',
        }),
        createContentDigest,
      },
      { collection: 'tweets' }
    );
    expect(actions.createNode).not.toHaveBeenCalled();
  });

  it('process Mdx node from matching collection', () => {
    onCreateNode({
      actions,
      node: {
        id: 'mdx_node_id',
        frontmatter: { id: 'twitter_id', title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      getNode: () => ({
        sourceInstanceName: 'tweets',
        relativeDirectory: 'subdir',
      }),
      createContentDigest,
    });

    // Check that one MdxTweet has been created.
    expect(actions.createNode).toHaveBeenCalledTimes(1);
    expect(actions.createNode).toHaveBeenCalledWith({
      id: 'twitter_id',
      parent: 'mdx_node_id',
      collection: 'tweets',
      title: 'A title with multiple words',
      path: '/tweets/a-title-with-multiple-words/',
      internal: { type: 'MdxTweet', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to Mdx node.
    expect(actions.createNodeField).toHaveBeenCalledTimes(2);
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: 'mdx_node_id',
        frontmatter: { id: 'twitter_id', title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'tweets',
    });
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: 'mdx_node_id',
        frontmatter: { id: 'twitter_id', title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'path',
      value: '/tweets/a-title-with-multiple-words/',
    });
  });

  it('process Mdx node from matching collection with custom options', () => {
    onCreateNode(
      {
        actions,
        node: {
          id: 'mdx_node_id',
          frontmatter: {
            id: 'twitter_id',
            title: 'A title with multiple words',
          },
          internal: { type: 'Mdx' },
        },
        getNode: () => ({
          sourceInstanceName: 'toots',
          relativeDirectory: 'subdir',
        }),
        createContentDigest,
      },
      { collection: 'toots', fullRelativePath: true }
    );

    // Check that one MdxTweet node has been created.
    expect(actions.createNode).toHaveBeenCalledTimes(1);
    expect(actions.createNode).toHaveBeenCalledWith({
      id: 'twitter_id',
      parent: 'mdx_node_id',
      collection: 'toots',
      title: 'A title with multiple words',
      path: '/toots/subdir/a-title-with-multiple-words/',
      internal: { type: 'MdxTweet', contentDigest: 'digest' },
    });

    // Check that 2 fields have been added to parent Mdx node.
    expect(actions.createNodeField).toHaveBeenCalledTimes(2);
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: 'mdx_node_id',
        frontmatter: { id: 'twitter_id', title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'collection',
      value: 'toots',
    });
    expect(actions.createNodeField).toHaveBeenCalledWith({
      node: {
        id: 'mdx_node_id',
        frontmatter: { id: 'twitter_id', title: 'A title with multiple words' },
        internal: { type: 'Mdx' },
      },
      name: 'path',
      value: '/toots/subdir/a-title-with-multiple-words/',
    });
  });
});
