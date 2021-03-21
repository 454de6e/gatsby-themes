# @maiertech/gatsby-theme-tweets-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Tweet` interface and `MdxTweet` type to Gatsby sites.

## Options

| Option                   | Default          | Description                                                                                                                 |
| :----------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `collection`             | `tweets`         | The collection is added to `Tweet` nodes and as field to the underlying `Mdx` node. It is also part of the path.            |
| `contentPath`            | `content/tweets` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories. |
| `fullRelativePath`       | `false`          | When set to `true`, include full path relative to `contentPath` in path of generated posts.                                 |
| `mdxOtherwiseConfigured` | `false`          | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                              |

## Frontmatter

| Key         | Required | Description                                                                                                                                                                                          |
| :---------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id          | ✓        | Twitter ID.                                                                                                                                                                                          |
| title       | ✓        | Tweet title, which will be slugified.                                                                                                                                                                |
| slug        |          | Override slugified title.                                                                                                                                                                            |
| user        |          | Twitter user.                                                                                                                                                                                        |
| description | ✓        | Tweet text. Also used as SEO description.                                                                                                                                                            |
| url         | ✓        | URL of original tweet, which is also used as canonical URL.                                                                                                                                          |
| thread      |          | Thread ID to group tweets into a thread.                                                                                                                                                             |
| tags        |          | Array of tags. For full tag support you need to install and configure [`@maiertech/gatsby-theme-tags-core`](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-tags-core). |
| image       |          | Relative path to image. A tweet can have one image as attachment. This image is displayed below the tweet and is used as open graph image.                                                           |
| imageTitle  |          | Image title.                                                                                                                                                                                         |
| imageAlt    |          | Image alt text.                                                                                                                                                                                      |

## `Tweet` interface

| Field       | Type        | Description                                                                                                                               |
| :---------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| id          | `ID!`       | Tweet ID.                                                                                                                                 |
| collection  | `String!`   | Collection to which this tweet belongs.                                                                                                   |
| title       | `String!`   | From frontmatter.                                                                                                                         |
| user        | `String`    | From frontmatter.                                                                                                                         |
| description | `String!`   | From frontmatter.                                                                                                                         |
| url         | `String!`   | From frontmatter.                                                                                                                         |
| thread      | `String`    | From frontmatter.                                                                                                                         |
| tags        | `[String!]` | From frontmatter.                                                                                                                         |
| image       | `File`      | Image file node.                                                                                                                          |
| imageTitle  | `String`    | Image title.                                                                                                                              |
| imageAlt    | `String`    | Image alt text.                                                                                                                           |
| path        | `String!`   | Path to generated page starts with `collection`, then full relative path if `fullRelativePath` is `true`, then slug derived from `title`. |

Type `MdxTweet` implements `Tweet`. If you prefer to use a data source other
than MDX files, you can write a child theme that implements the `Tweet`
interface.
