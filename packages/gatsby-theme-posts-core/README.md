# @maiertech/gatsby-theme-posts-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Post` interface and `MdxPost` type to Gatsby sites.

## Options

| Option                   | Default         | Description                                                                                                                 |
| :----------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `basePath`               | `/`             | Basepath for deployments at locations other than root.                                                                      |
| `collection`             | `posts`         | The collection is added to `Post` nodes and as field to the underlying `Mdx` node. It is also part of the path.             |
| `contentPath`            | `content/posts` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `fullRelativePath`       | `false`         | When set to `true`, include full path relative to `contentPath` in path of generated posts.                                 |
| `mdxOtherwiseConfigured` | `false`         | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                              |

## Frontmatter

| Key           | Required | Description                                                                                                                                                                                                                                                                                                 |
| :------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title         | ✓        | Post title, which will be slugified.                                                                                                                                                                                                                                                                        |
| slug          |          | Override slugified title.                                                                                                                                                                                                                                                                                   |
| author        |          | Post author.                                                                                                                                                                                                                                                                                                |
| date          |          | Date in yyyy-MM-dd format. There is no timezone magic happening anywhere. Date is optional in the sense that every posts in a collection should have a date or no post should have a date. If the collection does not have dates, previous and next posts do not make sense, even though they are computed. |
| description   | ✓        | Description for SEO and previews (text only).                                                                                                                                                                                                                                                               |
| tags          |          | For full tag support you need to install and configure [`@maiertech/gatsby-theme-tags-core`](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-tags-core).                                                                                                                       |
| images        |          | Array of images with `src` (relative path to image), optional `title` and mandatory `alt` text. Images can be embedded into MDX.                                                                                                                                                                            |
| canonical_url |          | Canonical URL for SEO.                                                                                                                                                                                                                                                                                      |

Author and date are optional to support using this theme to model notes in
[`@maiertech/gatsby-theme-digital-garden`](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-digital-garden).

## Schema customization

### `Post` interface

| Field        | Type           | Description                                                                                                                                                |
| :----------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | `ID!`          | Gatsby node GUID.                                                                                                                                          |
| collection   | `String!`      | Collection to which this post belongs.                                                                                                                     |
| title        | `String!`      | From frontmatter.                                                                                                                                          |
| author       | `String`       | From frontmatter.                                                                                                                                          |
| date         | `Date`         | From frontmatter.                                                                                                                                          |
| description  | `String!`      | From frontmatter.                                                                                                                                          |
| tags         | `[String!]`    | From frontmatter.                                                                                                                                          |
| images       | `[PostImage!]` | Images that can be embedded into a post.                                                                                                                   |
| body         | `String!`      | String representation of post body.                                                                                                                        |
| path         | `String!`      | Path to generated page starts with `basePath`, then `collection`, then full relative path if `fullRelativePath` is `true`, then slug derived from `title`. |
| canonicalUrl | `String`       | Canonical URL for SEO.                                                                                                                                     |

Type `MdxPost` implements `Post`. If you prefer to use a data source other than
MDX files, you can write a child theme that implements the `Post` interface.

### `PostImage` type

| Field | Type    | Description             |
| :---- | :------ | ----------------------- |
| src   | File!   | Relative path to image. |
| title | String  | Image title.            |
| alt   | String! | Image alt text.         |

## Images in posts

This theme assumes that you will use
[`gatsby-plugin-image`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image)
to render images in MDX files. Since
[`StaticImage`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image#static-images)
[does not work inside MDX files](https://github.com/gatsbyjs/gatsby/discussions/27950#discussioncomment-364659),
you have to declare images in the frontmatter with the `images` prop.

When you shadow
[`post-page.js`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-posts-core/src/components/post-page.js),
you need to create an images array with
[`gatsbyImageData`](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)
objects and provide the images array as prop to `MDXRenderer`. You can then
access and render these images with
[`GatsbyImage`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-image#dynamic-images)
inside MDX files. This is not ideal and it is intended as workaround until
`StaticImage` can be used inside MDX files.

The downside of dynamic images is that fragment
[`post-fragment.js`](https://github.com/UNDataForum/gatsby-themes/blob/master/packages/gatsby-theme-posts-core/src/post-fragment.js)
contains a hard-wired query for dynamic images as
[constrained images](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#layout).
Therefore, you cannot modify
[image options](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#image-options)
and have to go with what the fragment gives you.
