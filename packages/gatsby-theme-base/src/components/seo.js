import React from 'react';
import { arrayOf, node, string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { createUrl } from '@maiertech/gatsby-helpers';

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
  const { seoTitle, siteUrl, siteTwitter } = useSiteMetadata();
  const language = lang || 'en';
  const url = canonicalUrl ? canonicalUrl : createUrl(siteUrl, path);
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${seoTitle}`}
      defaultTitle={seoTitle}
    >
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
      <link rel="canonical" href={url} />
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: string,
  description: string.isRequired,
  keywords: arrayOf(string),
  lang: string,
  path: string.isRequired,
  canonicalUrl: string,
  children: node,
};

export default SEO;
