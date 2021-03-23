# @maiertech/gatsby-theme-tweets-core

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to add a `Tweet` interface and `MdxTweet` type to Gatsby sites.

## Options

| Option                   | Default          | Description                                                                                                                               |
| :----------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `collection`             | `tweets`         | The collection is added to `Tweet` nodes and as field to the underlying `Mdx` node. It is also part of the path.                          |
| `contentPath`            | `content/tweets` | Location of post MDX files and assets. You can organize them in whichever way you want, e.g. place them in sub-directories.               |
| `fullRelativePath`       | `false`          | When set to `true`, include full path relative to `contentPath` in path of generated posts.                                               |
| `mdxOtherwiseConfigured` | `false`          | Set this flag true if `gatsby-plugin-mdx` is already configured for your site.                                                            |
| `pruneLength`            | 160              | MDX body is pruned to this length for `description` on `MdxTweet`. 160 characters is the maxomum description length that Google displays. |

## Frontmatter

| Key    | Required | Description                                                                                                                                                                                          |
| :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id     | ✓        | Twitter ID.                                                                                                                                                                                          |
| title  | ✓        | Tweet title, which will be slugified.                                                                                                                                                                |
| slug   |          | Override slugified title.                                                                                                                                                                            |
| url    | ✓        | URL of original tweet, which is also used as canonical URL.                                                                                                                                          |
| thread |          | Thread ID to group tweets into a thread.                                                                                                                                                             |
| tags   |          | Array of tags. For full tag support you need to install and configure [`@maiertech/gatsby-theme-tags-core`](https://github.com/maiertech/gatsby-themes/tree/master/packages/gatsby-theme-tags-core). |
| image  |          | Image with `src` (relative path to image), `title` and `alt` text. A tweet can have one image as attachment. This image is displayed below the tweet and is used as open graph image.                |
| links  |          | Array of links to additional resources. Each link has `title` and `href` props.                                                                                                                      |

## Schema customization

### `Tweet` interface

| Field       | Type               | Description                                                                                                                               |
| :---------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| id          | `ID!`              | Tweet ID.                                                                                                                                 |
| collection  | `String!`          | Collection to which this tweet belongs.                                                                                                   |
| title       | `String!`          | From frontmatter.                                                                                                                         |
| description | `String!`          | `excerpt` from parent `Mdx` node.                                                                                                         |
| user        | `String`           | From frontmatter.                                                                                                                         |
| url         | `String!`          | From frontmatter.                                                                                                                         |
| thread      | `String`           | From frontmatter.                                                                                                                         |
| tags        | `[String!]`        | From frontmatter.                                                                                                                         |
| image       | `TweetImage`       |                                                                                                                                           |
| links       | `[TweetResource!]` |                                                                                                                                           |
| body        | `String!`          | String representation of tweet body from parent `Mdx` node.                                                                               |
| path        | `String!`          | Path to generated page starts with `collection`, then full relative path if `fullRelativePath` is `true`, then slug derived from `title`. |

Type `MdxTweet` implements `Tweet`. If you prefer to use a data source other
than MDX files, you can write a child theme that implements the `Tweet`
interface.

### `TweetImage` type

| Field | Type    | Description             |
| :---- | :------ | ----------------------- |
| src   | File!   | Relative path to image. |
| title | String  | Image title.            |
| alt   | String! | Image alt text.         |

### `TweetResource` type

| Field | Type      | Description |
| :---- | :-------- | ----------- |
| title | `String!` | Link title. |
| href  | `String!` | Link href.  |
