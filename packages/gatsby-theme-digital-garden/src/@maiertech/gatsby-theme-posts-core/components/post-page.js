import React from 'react';
import { object } from 'prop-types';
import { SEO, useSiteMetadata } from '@maiertech/gatsby-theme-base';
import {
  Container,
  Heading,
  PostPreview,
  Tags,
} from '@maiertech/gatsby-theme-theme-ui';
import { createPath } from '@maiertech/gatsby-helpers';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../../components/layout';
import PostFooter from '../../../components/post-footer';

const ShadowedPostPage = ({ data, location, pageContext }) => {
  const {
    title,
    author,
    date,
    datetime,
    description,
    tags,
    images,
    canonicalUrl,
    body,
  } = data.post;

  const { basePath, tagCollection, type } = pageContext.themeOptions;

  // Create post for PostPreview.
  const post = {
    title: (
      <Heading as="h1" sx={{ variant: 'styles.h1', mb: 3 }}>
        {title}
      </Heading>
    ),
    author,
    // Add date object to post only if both date and datetime exist.
    date: date && datetime ? { formatted: date, datetime } : undefined,
  };

  // Create values for Tags.
  const values = tags.map((tag) => ({
    tag,
    path: createPath(basePath, tagCollection, tag),
  }));

  // Read Twitter username from site metadata.
  const { siteTwitter: twitterUsername } = useSiteMetadata();

  return (
    <Layout location={location}>
      <SEO
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        path={location.pathname}
      />
      <Container variant="narrow">
        <PostPreview post={post} mb={3} />
        <Tags values={values} mb={3} />
        <MDXRenderer images={images}>{body}</MDXRenderer>
        {/* Display PageFooter only when type has been set in theme options. */}
        {type && (
          <PostFooter type={type} twitterUsername={twitterUsername} mt={4} />
        )}
      </Container>
    </Layout>
  );
};

ShadowedPostPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default ShadowedPostPage;
