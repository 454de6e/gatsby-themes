# @maiertech/gatsby-theme-pages-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Page` type to Gatsby sites.

## Options

| Option                   | Default         | Description                                                                                                                            |
| :----------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at locations other than root.                                                                                 |
| `contentPath`            | `content/pages` | Location of MDX files with pages. If pages use images, pages can be placed in a sub-directory as `index.mdx` together with its assets. |
| `fullRelativePath`       | `false`         | Set to `true` to include full path relative to `contentPath` in path of generated pages.                                               |
| `mdxOtherwiseConfigured` | `false`         | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                                         |

## Frontmatter

| Key           | Required | Description                                                                  |
| :------------ | :------- | :--------------------------------------------------------------------------- |
| title         | ✓        | Post title, which will be slugified.                                         |
| slug          |          | Override slugified title.                                                    |
| description   | ✓        | Description for SEO and previews.                                            |
| images        |          | Array of relative paths to images that can be rendered in the post MDX file. |
| canonical_url |          | Canonical URL for SEO.                                                       |

## `Page` interface

| Field        | Type      | Description                                             |
| :----------- | :-------- | :------------------------------------------------------ |
| id           | `ID!`     | Gatsby node GUID.                                       |
| title        | `String!` | From frontmatter.                                       |
| description  | `String!` | From frontmatter.                                       |
| images       | `[File!]` | File nodes for images that can be embedded into a post. |
| body         | `String!` | MDX body.                                               |
| path         | `String!` | Page path.                                              |
| canonicalUrl | `String`  | Canonical URL for SEO.                                  |

Type `MdxPage` implements `Page`. If you prefer to use a data source other than
MDX files, you can write a child theme that uses the `Page` interface.

## Images in pages

This theme assumes that you will use
[`gatsby-plugin-image`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image)
to render images in MDX files. Since
[`StaticImage`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image#static-images)
[does not work inside MDX files](https://github.com/gatsbyjs/gatsby/discussions/27950#discussioncomment-364659),
you have to declare images in the frontmatter with the `images` prop.

When you shadow
[`page.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-pages-core/src/page.js),
you need to create an images array with
[`gatsbyImageData`](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)
objects and provide the images array as prop to `MDXRenderer`. You can then
access and render these images with
[`GatsbyImage`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image#dynamic-images)
inside MDX files. This is not ideal and it is intended as workaround until
`StaticImage` can be used inside MDX files.

The downside of dynamic images is that fragment
[`page-fragment.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-pages-core/src/page-fragment.js)
contains a hard-wired query for dynamic images as
[constrained images](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#layout).
Therefore, you cannot modify
[image options](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)
and have to go with what the fragment gives you.
