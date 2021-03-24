import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Box,
  Container,
  Heading,
  Link,
  Tags,
  TwitterIcon,
} from '@maiertech/gatsby-theme-theme-ui';
import { GatsbyImage } from 'gatsby-plugin-image';
import { createPath } from '@maiertech/gatsby-helpers';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../../components/layout';

const ShadowedTweetPage = ({ data, location, pageContext }) => {
  const { title, description, tags, body, image, url, links } = data.tweet;

  const {
    pathPrefix,
    themeOptions: { tagCollection },
    thread,
  } = pageContext;

  // Create values for Tags.
  const values = tags.map((tag) => ({
    tag,
    path: createPath(pathPrefix, tagCollection, tag),
  }));

  return (
    <Layout location={location}>
      <SEO title={title} description={description} path={location.pathname} />
      <Container variant="narrow">
        {thread && (
          <>
            <Heading as="h1" sx={{ variant: 'styles.h1', mb: 3 }}>
              {`Thread: ${thread[0].thread}`}
            </Heading>
            <ol>
              {thread.map((tweet) => {
                if (location.pathname === tweet.path) {
                  return <li>{tweet.title}</li>;
                }
                return (
                  <li>
                    <Link href={tweet.path}>{tweet.title}</Link>
                  </li>
                );
              })}
            </ol>
          </>
        )}
        <Heading
          as={thread ? 'h2' : 'h1'}
          sx={{ variant: thread ? 'styles.h2' : 'styles.h1', mb: 3 }}
        >
          {title}
        </Heading>
        <Tags values={values} mb={3} />
        <MDXRenderer>{body}</MDXRenderer>
        {image && (
          <Box mb={3}>
            <GatsbyImage
              image={image.src.childImageSharp.gatsbyImageData}
              alt={image.alt}
            />
          </Box>
        )}
        <Link href={url}>
          <TwitterIcon />
        </Link>
        {links && (
          <>
            <Heading
              as={thread ? 'h3' : 'h3'}
              sx={{ variant: thread ? 'styles.h3' : 'styles.h2', my: 3 }}
            >
              Links
            </Heading>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </Layout>
  );
};

ShadowedTweetPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default ShadowedTweetPage;
