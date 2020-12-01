import React from 'react';
import { object } from 'prop-types';
import {
  Container,
  Layout,
  Styled,
  Tags,
} from '@maiertech/gatsby-theme-theme-ui';
import { SEO } from '@maiertech/gatsby-theme-base';

const TagsPage = ({ location, pageContext }) => (
  <Layout location={location}>
    <SEO
      title={`Tags in ${pageContext.themeOptions.tagCollection}`}
      description={`Overview of tags in ${pageContext.themeOptions.tagCollection}`}
      path={location.pathname}
    />
    <Container variant="narrow">
      <Styled.h1>
        {`Tags in ${pageContext.themeOptions.tagCollection}`}
      </Styled.h1>
      <Tags
        values={pageContext.tags.map(({ tag, count, path }) => ({
          tag: `${tag} (${count})`,
          path,
        }))}
      />
    </Container>
  </Layout>
);

TagsPage.propTypes = {
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default TagsPage;
