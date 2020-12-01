# @maiertech/gatsby-theme-theme-ui

## Styling

All `@maiertech/gatsby-theme-<content_type>-core` themes are themes that come
without any opinion on styling. The idea is that you shadow all page components
and use whatever you prefer for styling.

This theme on the other hand, is opinionated about styling. It wires up
[Theme UI](https://theme-ui.com/home) for use with
[Gatsby](https://www.gatsbyjs.com/) and configures
[@maiertech/preset](https://github.com/maiertech/design-system/tree/master/packages/preset)
as theme. You can use any other Theme UI preset by shadowing `index.js` of
[`gatsby-plugin-theme-ui`](https://theme-ui.com/packages/gatsby-plugin/).

## Components

This theme provides a `Laout` component. For this component to work, you need to
define
[site metadata](https://www.gatsbyjs.com/docs/gatsby-config/#sitemetadata) in
your site's `gatsby-config.js`:

| Key        | Required | Description                       |
| :--------- | :------- | :-------------------------------- |
| siteTitle  | ✓        | Site title for header and footer. |
| siteAuthor | ✓        | Site for footer.                  |

## Plugins

| Plugin                                                                                     | Description                                                                                                                                                                                                                              |
| :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`gatsby-plugin-catch-links`](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/) | Make [`@maiertech/components`](https://github.com/maiertech/design-system/tree/master/packages/components) compatible with Gatsby by using Gatsby's [Link](https://www.gatsbyjs.com/docs/gatsby-link/) component for all internal links. |
| [`gatsby-plugin-theme-ui`](https://theme-ui.com/packages/gatsby-plugin/)                   | Wire up [Theme UI](https://theme-ui.com/home) for use with Gatsby.                                                                                                                                                                       |
