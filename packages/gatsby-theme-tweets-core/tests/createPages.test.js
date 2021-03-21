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

  it('generate tweet pages', async () => {
    await createPages({
      actions,
      graphql: () => ({
        data: {
          allTweet: {
            nodes: [
              {
                id: '3',
                title: 'Title of third tweet',
                thread: 'Laborum non tempor',
                path: '/tweets/third-tweet/',
              },
              {
                id: '2',
                title: 'Title of second tweet',
                thread: 'Laborum non tempor',
                path: '/tweets/second-tweet/',
              },
              {
                id: '1',
                title: 'Title of first tweet',
                path: '/tweets/first-tweet/',
              },
            ],
          },
        },
      }),
      pathPrefix: '',
      reporter,
    });

    expect(reporter.error).not.toHaveBeenCalled();

    // Check that tweets page and 3 tweet pages have been created.
    expect(actions.createPage).toHaveBeenCalledTimes(4);

    // Tweets page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tweets/',
      component: require.resolve('../src/templates/tweets.js'),
      context: {
        collection: 'tweets',
        themeOptions: {
          collection: 'tweets',
          contentPath: 'content/tweets',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First tweet.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tweets/first-tweet/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '1',
        prev: {
          id: '2',
          title: 'Title of second tweet',
          thread: 'Laborum non tempor',
          path: '/tweets/second-tweet/',
        },
        next: undefined,
        pathPrefix: '',
        themeOptions: {
          collection: 'tweets',
          contentPath: 'content/tweets',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second tweet.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tweets/second-tweet/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '2',
        prev: {
          id: '3',
          title: 'Title of third tweet',
          thread: 'Laborum non tempor',
          path: '/tweets/third-tweet/',
        },
        next: {
          id: '1',
          title: 'Title of first tweet',
          path: '/tweets/first-tweet/',
        },
        thread: [
          {
            id: '2',
            title: 'Title of second tweet',
            thread: 'Laborum non tempor',
            path: '/tweets/second-tweet/',
          },
          {
            id: '3',
            title: 'Title of third tweet',
            thread: 'Laborum non tempor',
            path: '/tweets/third-tweet/',
          },
        ],
        pathPrefix: '',
        themeOptions: {
          collection: 'tweets',
          contentPath: 'content/tweets',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third tweet.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/tweets/third-tweet/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '3',
        prev: undefined,
        next: {
          id: '2',
          title: 'Title of second tweet',
          thread: 'Laborum non tempor',
          path: '/tweets/second-tweet/',
        },
        thread: [
          {
            id: '2',
            title: 'Title of second tweet',
            thread: 'Laborum non tempor',
            path: '/tweets/second-tweet/',
          },
          {
            id: '3',
            title: 'Title of third tweet',
            thread: 'Laborum non tempor',
            path: '/tweets/third-tweet/',
          },
        ],
        pathPrefix: '',
        themeOptions: {
          collection: 'tweets',
          contentPath: 'content/tweets',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });
  });

  it('generate tweet pages with custom theme options', async () => {
    await createPages(
      {
        actions,
        graphql: () => ({
          data: {
            allTweet: {
              nodes: [
                {
                  id: '3',
                  title: 'Title of third toot',
                  path: '/toots/third-toot/',
                },
                {
                  id: '2',
                  title: 'Title of second toot',
                  path: '/toots/second-toot/',
                },
                {
                  id: '1',
                  title: 'Title of first toot',
                  path: '/toots/first-toot/',
                },
              ],
            },
          },
        }),
        pathPrefix: '',
        reporter,
      },
      { collection: 'toots', contentPath: 'content/toots' }
    );

    expect(reporter.error).not.toHaveBeenCalled();

    // Check that tweets page and 3 tweet pages have been created.
    expect(actions.createPage).toHaveBeenCalledTimes(4);

    // Tweets page.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/toots/',
      component: require.resolve('../src/templates/tweets.js'),
      context: {
        collection: 'toots',
        themeOptions: {
          collection: 'toots',
          contentPath: 'content/toots',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // First toot.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/toots/first-toot/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '1',
        prev: {
          id: '2',
          title: 'Title of second toot',
          path: '/toots/second-toot/',
        },
        next: undefined,
        pathPrefix: '',
        themeOptions: {
          collection: 'toots',
          contentPath: 'content/toots',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Second toot.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/toots/second-toot/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '2',
        prev: {
          id: '3',
          title: 'Title of third toot',
          path: '/toots/third-toot/',
        },
        next: {
          id: '1',
          title: 'Title of first toot',
          path: '/toots/first-toot/',
        },
        pathPrefix: '',
        themeOptions: {
          collection: 'toots',
          contentPath: 'content/toots',
          fullRelativePath: false,
          mdxOtherwiseConfigured: false,
        },
      },
    });

    // Third toot.
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/toots/third-toot/',
      component: require.resolve('../src/templates/tweet.js'),
      context: {
        id: '3',
        prev: undefined,
        next: {
          id: '2',
          title: 'Title of second toot',
          path: '/toots/second-toot/',
        },
        pathPrefix: '',
        themeOptions: {
          collection: 'toots',
          contentPath: 'content/toots',
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
      'There was an error fetching tweets.',
      true
    );
  });
});
