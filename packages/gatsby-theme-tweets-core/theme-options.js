module.exports = (themeOptions) => ({
  collection: 'tweets',
  contentPath: 'content/tweets',
  fullRelativePath: false,
  mdxOtherwiseConfigured: false,
  ...themeOptions,
});
