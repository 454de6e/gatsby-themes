import React from 'react';
import { object } from 'prop-types';
import { Container, Themed } from '@maiertech/gatsby-theme-theme-ui';
import { SEO } from '@maiertech/gatsby-theme-base';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../../components/layout';

const ShadowedPage = ({ data, location }) => {
  const { title, description, images, canonicalUrl, body } = data.page;

  // Create images for MDXRenderer.
  const constrainedImages = images
    ? images.map((image) => image.childImageSharp.gatsbyImageData)
    : undefined;
  return (
    <Layout location={location}>
      <SEO
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        path={location.pathname}
      />
      <Container variant="narrow">
        <Themed.h1>{title}</Themed.h1>
        <MDXRenderer images={constrainedImages}>{body}</MDXRenderer>
      </Container>
    </Layout>
  );
};

ShadowedPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default ShadowedPage;
