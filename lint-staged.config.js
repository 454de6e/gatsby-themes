const micromatch = require('micromatch');
const prettier = require('prettier');

// Figure out all extensions supported by Prettier.
const prettierSupportedExtensions = prettier
  .getSupportInfo()
  .languages.map(({ extensions }) => extensions)
  .flat();

module.exports = (allStagedFiles) => {
  // Match files for ESLint.
  const eslintFiles = micromatch(allStagedFiles, ['**/*.js']);
  // Match all files that can be formated by Prettier.
  const prettierFiles = micromatch(
    allStagedFiles,
    prettierSupportedExtensions.map((extension) => `**/*${extension}`)
  );
  return [
    `eslint --fix ${eslintFiles.join(' ')}`,
    `prettier --write ${prettierFiles.join(' ')}`,
  ];
};
