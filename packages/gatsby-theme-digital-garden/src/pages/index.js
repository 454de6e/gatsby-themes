import React from 'react';
import { object } from 'prop-types';
import { SEO, useSiteMetadata } from '@maiertech/gatsby-theme-base';
import {
  Button,
  Container,
  Grid,
  Heading,
  Link,
  PostPreview,
  Text,
} from '@maiertech/gatsby-theme-theme-ui';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const Homepage = ({ data, location }) => {
  const { siteDescription } = useSiteMetadata();
  const posts = data.allPost.posts.map(
    ({ id, title, date, datetime, description, path }) => ({
      id,
      title: (
        <Heading
          as="h1"
          sx={{
            variant: 'styles.h1',
            // Override color from variant.
            color: 'inherit',
            mb: 3,
          }}
        >
          {title}
        </Heading>
      ),
      date: { formatted: date, datetime },
      description: (
        <Text as="p" mb={3}>
          {description}
        </Text>
      ),
      path,
    })
  );
  return (
    <Layout location={location}>
      <SEO
        title="Homepage"
        description={siteDescription}
        path={location.pathname}
      />
      <Container variant="narrow">
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

Homepage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default Homepage;

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
