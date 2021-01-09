# @maiertech/gatsby-theme-base

## Site metadata

This theme exports an `SEO` component. For this component to work, you need to
define the following
[site metadata](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata) in
your site's `gatsby-config.js`:

| Key             | Required | Description                                                              |
| :-------------- | :------- | :----------------------------------------------------------------------- |
| siteTitle       | ✓        | Site title for SEO.                                                      |
| siteDescription |          | Optional site description for SEO of the homepage.                       |
| siteUrl         | ✓        | URL from which the production site is served. Used for sitemap creation. |
| siteTwitter     | ✓        | Site Twitter username for SEO.                                           |

## Plugins

| Plugin                                                                                     | Description                                |
| :----------------------------------------------------------------------------------------- | :----------------------------------------- |
| [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/) | Required to make the `SEO` component work. |
