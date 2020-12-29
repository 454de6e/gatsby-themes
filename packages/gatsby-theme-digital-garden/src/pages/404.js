import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Button,
  Container,
  Grid,
  Heading,
  Link,
  PostPreview,
  Themed,
} from '@maiertech/gatsby-theme-theme-ui';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const NotFound = ({ data, location }) => {
  const posts = data.allPost.posts.map(
    ({ id, title, date, datetime, path }) => ({
      id,
      title: (
        <Heading
          as="h2"
          sx={{
            variant: 'styles.h2',
            mb: 2,
          }}
        >
          {title}
        </Heading>
      ),
      date: { formatted: date, datetime },
      path,
    })
  );
  return (
    <Layout location={location}>
      <SEO
        title="404: Not Found"
        description="Oops! The page you were looking for does not exist."
        path={location.pathname}
      />
      <Container variant="narrow">
        <Themed.h1>404: Not Found</Themed.h1>
        <Themed.p>
          Oops! The page you were looking for does not exist. Read one of our
          latest posts instead:
        </Themed.p>
        <Grid gap={4} columns={1}>
          {posts.map(({ id, path, ...post }) => (
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
              <PostPreview post={{ ...post }} mb={2} />
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

NotFound.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default NotFound;

export const query = graphql`
  query {
    allPost(
      sort: { fields: [date, title], order: [DESC, ASC] }
      filter: { collection: { eq: "posts" } }
      limit: 3
    ) {
      posts: nodes {
        ...PostFragment
      }
    }
  }
`;
