import React from 'react';
import { arrayOf, node, string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { createPath } from '@maiertech/gatsby-helpers';

import useSiteMetadata from '../use-site-metadata';

const SEO = ({
  title,
  description,
  keywords,
  lang,
  path,
  canonicalUrl,
  children,
}) => {
  const { siteTitle, siteUrl, siteTwitter } = useSiteMetadata();
  const language = lang || 'en';
  const url = canonicalUrl ? canonicalUrl : createPath(siteUrl, path);
  return (
    <Helmet title={title} titleTemplate={`%s | ${siteTitle}`}>
      <html lang={language} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={siteTwitter} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  keywords: arrayOf(string),
  lang: string,
  path: string.isRequired,
  canonicalUrl: string,
  children: node,
};

export default SEO;
