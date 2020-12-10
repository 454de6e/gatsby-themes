import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Container,
  Heading,
  Layout,
  PostPreview,
  Tags,
} from '@maiertech/gatsby-theme-theme-ui';
import { createPath } from '@maiertech/gatsby-helpers';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const ShadowedPostPage = ({ data, location, pageContext }) => {
  const { title, author, date, datetime, description, tags, body } = data.post;
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
  const { basePath, tagCollection } = pageContext.themeOptions;
  const values = tags.map((tag) => ({
    tag,
    path: createPath(basePath, tagCollection, tag),
  }));
  return (
    <Layout location={location}>
      <SEO title={title} description={description} path={location.pathname} />
      <Container variant="narrow">
        <PostPreview post={post} mb={3} />
        <Tags values={values} mb={3} />
        <MDXRenderer>{body}</MDXRenderer>
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
