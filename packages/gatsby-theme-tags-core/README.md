# @maiertech/gatsby-theme-tags-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add tagging support to MDX pages. This theme processes nodes of type `Mdx`
only, which are created by
[`gatsby-plugin-mdx`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx).
Only those `Mdx` nodes are processed, which fulfill the compatibility
requirements described below. For this theme to work, you need to have **at
least one tag in any tagged collection**.

## Options

| Option           | Default | Description                                                                                                                                                       |
| :--------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`       | `/`     | Basepath for deployments at locations other than root.                                                                                                            |
| `tagCollection`  | tags    | The tag collection is part of the path of tag pages.                                                                                                              |
| `mdxCollections` | `[]`    | Array of collections from which the theme collects tags. The theme looks at the `collection` field of `Mdx` nodes. If array is empty, no tag pages are generated. |

## When is a theme compatible?

A theme is compatible with @maiertech/gatsby-theme-tags-core if all of the
following requirements are met:

1. It uses `gatsby-plugin-mdx` as parent theme.
1. It adds fields `collection` and `path` to `Mdx` nodes.
1. It supports a `title` and `tags` properties in the frontmatter of MDX pages
   it processes, i.e., template queries include `frontmatter.tags` and
   `frontmatter.title`.

Let's start with the last requirement. Frontmatter of tagged MDX pages needs to
include the following keys:

| Key     | Required | Description                                                                                                                                                 |
| :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | ✓        |                                                                                                                                                             |
| `tags`  | ✓        | Array of tags. Think of tags as keys, not strings, that might be used for pulling localization strings later on. Therefore, tags should not contain spaces. |

The frontmatter can also include optional `date` and `description` keys. `date`
is optional, because tagging should also work for content types without a date,
e.g., notes. `description` is optional to allow for alterantive ways of deriving
a description, e.g., from the first paragraph.

The second requirement states that corresponding `Mdx` nodes need to contain the
following fields:

| Field        | Required | Description                         |
| :----------- | :------- | :---------------------------------- |
| `collection` | ✓        | Collection to which a node belongs. |
| `path`       | ✓        | Path to generated page.             |

All of above fields and frontmatter keys, including optional keys, are made
availalbe via the
[`TaggedItem` fragment](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/tagged-item-fragment.js),
which is used in the
[`tag-query.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-tags-core/src/templates/tag-query.js)
template.
