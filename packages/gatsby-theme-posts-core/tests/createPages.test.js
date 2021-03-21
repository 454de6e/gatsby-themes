const { createPages } = require('../gatsby-node');

describe('createPages', () => {
  let actions;
  let reporter;

  beforeAll(() => {
    // Create spies.
    actions = { createPage: jest.fn() };
    reporter = { error: jest.fn() };
  });

  beforeEach(() => {
    // Reset spies.
    actions.createPage.mockClear();
    reporter.error.mockClear();
  });

  it('generate post pages', async () => {
    await createPages({
      actions,
      graphql: () => ({
        data: {
          allPost: {
            nodes: [
              {
                id: '3',
                title: 'Title of third post',
                path: '/posts/third-post/',
              },
              {
                id: '2',
                title: 'Title of second post',
                path: '/posts/second-post/',
              },
              {
                id: '1',
                title: 'Title of first post',
                path: '/posts/first-post/',
              },
            ],
          },
        },
      }),
      reporter,
    });

    expect(reporter.error).not.toHaveBeenCalled();

    // Check that posts page and 3 post pages have been created.
    expect(actions.createPage).toHaveBeenCalledTimes(4);

    // Posts page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/posts/',
      component: require.resolve('../src/templates/posts.js'),
      context: {
        collection: 'posts',
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/posts/first-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '1',
        prev: {
          id: '2',
          title: 'Title of second post',
          path: '/posts/second-post/',
        },
        next: undefined,
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/posts/second-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '2',
        prev: {
          id: '3',
          title: 'Title of third post',
          path: '/posts/third-post/',
        },
        next: {
          id: '1',
          title: 'Title of first post',
          path: '/posts/first-post/',
        },
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/posts/third-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '3',
        prev: undefined,
        next: {
          id: '2',
          title: 'Title of second post',
          path: '/posts/second-post/',
        },
        themeOptions: {
          basePath: '/',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });

  it('generate post pages with custom options', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allPost: {
              nodes: [
                {
                  id: '3',
                  title: 'Title of third post',
                  path: '/custom/posts/third-post/',
                },
                {
                  id: '2',
                  title: 'Title of second post',
                  path: '/custom/posts/second-post/',
                },
                {
                  id: '1',
                  title: 'Title of first post',
                  path: '/custom/posts/first-post/',
                },
              ],
            },
          },
        }),
        reporter,
      },
      { basePath: '/custom' }
    );

    expect(reporter.error).not.toHaveBeenCalled();

    // Check that posts page and 3 post pages have been created.
    expect(actions.createPage).toHaveBeenCalledTimes(4);

    // Posts page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/custom/posts/',
      component: require.resolve('../src/templates/posts.js'),
      context: {
        collection: 'posts',
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/custom/posts/first-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '1',
        prev: {
          id: '2',
          title: 'Title of second post',
          path: '/custom/posts/second-post/',
        },
        next: undefined,
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/custom/posts/second-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '2',
        prev: {
          id: '3',
          title: 'Title of third post',
          path: '/custom/posts/third-post/',
        },
        next: {
          id: '1',
          title: 'Title of first post',
          path: '/custom/posts/first-post/',
        },
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third post.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/custom/posts/third-post/',
      component: require.resolve('../src/templates/post.js'),
      context: {
        id: '3',
        prev: undefined,
        next: {
          id: '2',
          title: 'Title of second post',
          path: '/custom/posts/second-post/',
        },
        themeOptions: {
          basePath: '/custom',
          collection: 'posts',
          contentPath: 'content/posts',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });

  it('error', async () => {
    await createPages({
      actions,
      graphql: () => ({ errors: true }),
      reporter,
    });

    expect(reporter.error).toHaveBeenCalledTimes(1);
    expect(reporter.error).toHaveBeenCalledWith(
      'There was an error fetching posts.',
      true
    );
  });
});
