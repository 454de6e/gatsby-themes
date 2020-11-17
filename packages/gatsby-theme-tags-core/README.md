# @maiertech/gatsby-theme-tags-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add tagging support to MDX pages.

## Options

| Option           | Default | Description                                                                                                                                                       |
| :--------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`       | `/`     | Basepath for deployments at locations other than root.                                                                                                            |
| `tagCollection`  | tags    | The tag collection is added to `Tag` nodes. It is also part of the path.                                                                                          |
| `mdxCollections` | `[]`    | Array of collections from which the theme collects tags. The theme looks at the `collection` field of `Mdx` nodes. If array is empty, no tag pages are generated. |

## Requirements for tagged MDX pages

For tagging to work, the frontmatter of tagged MDX pages needs to include the
following keys:

| Key     | Required | Description                                                               |
| :------ | :------- | :------------------------------------------------------------------------ |
| `title` | ✓        |                                                                           |
| `date`  | ✓        | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. |
| `tags`  | ✓        | Array of tags.                                                            |

The frontmatter can also include an optional `description` key. Furthermore, MDX
nodes of tagged pages need to contain the following fields:

| Field        | Required | Description                         |
| :----------- | :------- | :---------------------------------- |
| `collection` | ✓        | Collection to which a node belongs. |
| `path`       | ✓        | Path to generated page.             |

All above fields, including optional `description`, are made availalbe via the
[`TaggedItem` fragment](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/tagged-item-fragment.js),
which is used in the
[`tag-query.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/templates/tag-query.js)
template.

You can use this theme to tag MDX pages from any theme that guarantees that
`collection` and `path` fields exist on MDX nodes and that is able to process
above frontmatter fields. You can use optional `frontmatter.description` for
tagged items in cases where all tagged pages support `description` in
frontmatter. Some compatible themes, such as
[`@undataforum/gatsby-themeblog-core`](https://github.com/UNDataForum/gatsby-themes/tree/master/packages/gatsby-theme-blog-core)
do not derive description from the frontmatter and therefore
`frontmatter.description` is not availalbe. This why `description` is optional.
