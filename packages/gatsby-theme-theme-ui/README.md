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

## Caveat

This theme has package
[`theme-ui`](https://github.com/system-ui/theme-ui/tree/master/packages/theme-ui)
as a dependency (you can look up the version in its
[`package.json`](https://github.com/maiertech/gatsby-themes/blob/master/packages/gatsby-theme-theme-ui/package.json)).
`theme-ui` relies on
[`@theme-ui/mdx`](https://github.com/system-ui/theme-ui/tree/master/packages/mdx),
which has `@mdx-js/react` as dependency (not peer dependency) and you can look
up the version in its
[`package.json`](https://github.com/system-ui/theme-ui/blob/master/packages/mdx/package.json)).

The moment you use
[`gatsby-plugin-mdx`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx),
you normally install `@mdx-js/react` as peer dependency. But at what version? If
you run

```
yarn list --pattern mdx
```

and you see `@mdx-js/react` more than once (at different versions), you might be
in trouble. Component `MDXProvider` from `@mdx-js/react` creates a context and
when nested works as intended only, when all instances use the same context. But
when the versions used by `theme-ui` and `gatasby-plugin-mdx` differ, you end up
with conflicting contexts and the Theme UI styled MDX transformation breaks.

If you are unable to reconcile the version conflict yourself, your last resort
is to add a `resolutions` property to your project root and decide which version
should be used everywhere:

```
"resolutions": {
  "@mdx-js/react": "^1.6.22"
}
```

This works with [Yarn](https://classic.yarnpkg.com/lang/en/) only and the
version should probably be the one from your `@mdx-js/react` peer dependency.
