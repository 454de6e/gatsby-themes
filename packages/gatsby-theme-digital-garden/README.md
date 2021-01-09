# @maiertech/gatsby-theme-digital-garden

A [Gatsby theme](https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/)
to create a [digital garden](https://joelhooks.com/digital-garden).

This theme's data model and styling are opinionated. If it does not match your
use case, you can use my core themes and your preferred styling to assemble your
own digital garden theme.

## Site metadata

This theme requires the following site metadata:

| Key          | Required | Description                                                              |
| :----------- | :------- | :----------------------------------------------------------------------- |
| siteTitle    | ✓        | Site title for header and footer and for SEO.                            |
| siteAuthor   | ✓        | Site author for footer.                                                  |
| siteNavLinks | ✓        | Navigation links for header and footer.                                  |
| siteTwitter  | ✓        | Site Twitter username for SEO.                                           |
| siteUrl      | ✓        | URL from which the production site is served. Used for sitemap creation. |

## Options

| Option     | Default | Description                                            |
| :--------- | :------ | :----------------------------------------------------- |
| `basePath` | `/`     | Basepath for deployments at locations other than root. |

## Content types

### Notes

A note is the most basic unit of information in my digital garden. It is an MDX
page that is located in `content/notes`. It uses the following frontmatter
fields:

| Field       | Required | Description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| title       | ✓        |                                                              |
| description | ✓        | A brief description of what the note is about.               |
| tags        | ✓        | One or more tags are required to be able to discover a note. |

Notes do not have dates, because they are raw and unpolished. Most notes will
receive a few updates and then never change again. Some notes will receive more
updates and slowly mature and can then graduate into a post. Notes can be
renamed or deleted at any time. Due to their unfinished nature, they are exluded
from the generated site map and disallowed in `robots.txt`.

### Posts

Posts are located in `content/posts` and add `author` and `date` fields. They
are usually the result of several iterations on one or many notes and are much
more polished than notes. You can think of a post date as the graduation date of
the underlying notes. When a note has been used for a post, it can be deleted.
