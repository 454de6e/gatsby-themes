# @maiertech/gatsby-theme-base

## Components

This theme provides an `SEO` component. For this component to work, you need to
define
[site metadata](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata) in
your site's `gatsby-config.js`:

| Key         | Required | Description                                                              |
| :---------- | :------- | :----------------------------------------------------------------------- |
| siteTitle   | ✓        | Site title for SEO.                                                      |
| siteUrl     | ✓        | URL from which the production site is served. Used for sitemap creation. |
| siteTwitter | ✓        | Site Twitter username for SEO.                                           |

## Plugins

| Plugin                                                                                     | Description                                                                                                             |
| :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/)           | Create a [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) that you can submit to Google. |
| [gatsby-plugin-react-helmet](https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/) | Required to make the `SEO` component work.                                                                              |
