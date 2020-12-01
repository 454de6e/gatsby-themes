import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Container,
  Grid,
  Heading,
  Layout,
  Link,
  PostPreview,
  Styled,
} from '@maiertech/gatsby-theme-theme-ui';

const PostsPage = ({ data, location }) => {
  const posts = data.allPost.posts.map(
    ({ id, title, date, datetime, path }) => ({
      id,
      title: (
        <Heading as="h2" sx={{ variant: 'styles.h2', mb: 1 }}>
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
        title="Posts"
        description="Overview of posts."
        path={location.pathname}
      />
      <Container variant="narrow">
        <Styled.h1>Posts</Styled.h1>
        <Grid gap={4} columns={1}>
          {posts.map(({ id, path, ...post }) => (
            <Link key={id} href={path} sx={{ color: 'inherit' }}>
              <PostPreview post={{ ...post }} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

PostsPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
};

export default PostsPage;
