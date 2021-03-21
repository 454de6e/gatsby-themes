const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const _filter = require('lodash.filter');
const slugify = require('@sindresorhus/slugify');

// Re-export slugify.
module.exports.slugify = slugify;

// Re-export lodash.filter.
module.exports.filter = _filter;

// Helper to create path from segments and add leading and trailing /.
// This function uses the Node API!
const createPath = (...segments) => {
  const path = join(...segments);
  // Add leading and trailing / if there are none.
  // /^\/*/ matches zero or more occurrences of / at the beginning.
  // /\/*$/ matches zero or more occurrences of / at the end.
  return path.replace(/^\/*/, '/').replace(/\/*$/, '/');
};
module.exports.createPath = createPath;

// Helper to assemble a URL from a base and a path.
// Base can be with or without trailing /.
// Created URL always ends with trailing /.
// This function will run in browser during dev.
module.exports.createUrl = (base, path) =>
  `${base.replace(/\/$/, '')}${createPath(path)}`;

// Helper to ensure that a path exists.
// This function uses the Node API!
/* istanbul ignore next */
module.exports.ensurePathExists = (path, reporter) => {
  if (existsSync(path)) {
    return;
  }
  reporter.warn(`Creating ${path}.`);
  mkdirSync(path, { recursive: true });
};

// https://lodash.com/docs/4.17.15#filter
module.exports.filterNodes = (data, filter) => {
  // Figure out key name, e.g. `allPost` or `allTag`.
  const key = Object.keys(data)[0];
  const nodes = data[key].nodes;

  if (!nodes) return [];

  return _filter(nodes, filter);
};

// Helper to resolve fields on Mdx nodes.
/* istanbul ignore next */
module.exports.mdxResolverPassthrough = (fieldName) => {
  return async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    const value = await resolver(mdxNode, args, context, {
      fieldName,
    });

    return value.items ? value.items : value;
  };
};
