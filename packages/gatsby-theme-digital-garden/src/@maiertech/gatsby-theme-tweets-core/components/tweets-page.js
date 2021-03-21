import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Button,
  Container,
  Grid,
  Heading,
  Link,
} from '@maiertech/gatsby-theme-theme-ui';

import Layout from '../../../components/layout';

const ShadowedTweetsPage = ({ data, location, pageContext }) => {
  debugger;
  return (
    <Layout location={location}>
      <SEO
        title={pageContext.collection}
        description={`All ${pageContext.collection}`}
        path={location.pathname}
      />
      <Container variant="narrow">
        <Heading
          as="h1"
          sx={{ textTransform: 'capitalize' }}
          variant="styles.h1"
        >
          {pageContext.collection}
        </Heading>
        <Grid gap={4} columns={1}>
          {data.allTweet.nodes.map(({ id, path, ...tweet }) => (
            <Link
              key={id}
              href={path}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '@media (hover: hover)': {
                  '&:hover': {
                    textDecoration: 'none',
                  },
                },
              }}
            >
              <Heading
                as="h2"
                sx={{
                  variant: 'styles.h2',
                  mb: 2,
                }}
              >
                {tweet.title}
              </Heading>

              <Button as="div" sx={{ fontWeight: 'bold' }}>
                Read →
              </Button>
            </Link>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

ShadowedTweetsPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default ShadowedTweetsPage;
