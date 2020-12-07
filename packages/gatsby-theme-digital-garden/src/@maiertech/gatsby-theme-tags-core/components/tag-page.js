import React from 'react';
import { object } from 'prop-types';
import { SEO } from '@maiertech/gatsby-theme-base';
import {
  Container,
  Heading,
  Layout,
  Link,
  PostPreview,
  Styled,
  Tags,
} from '@maiertech/gatsby-theme-theme-ui';
import { Link as GatsbyLink } from 'gatsby';

const ShadowedTagPage = ({ data, location, pageContext }) => {
  const { tag } = pageContext;
  const taggedItems = data.allMdx.nodes.map(
    ({
      id,
      frontmatter: { title, date, datetime },
      fields: { collection, path },
    }) => ({
      id,
      path,
      taggedItem: {
        collection,
        title: (
          <Heading as="h2" sx={{ variant: 'styles.h2', mb: 1 }}>
            {title}
          </Heading>
        ),
        date: { formatted: date, datetime },
      },
    })
  );
  return (
    <Layout location={location}>
      <SEO
        title={tag}
        description={`Content tagged with ${tag}.`}
        path={location.pathname}
      />
      <Container variant="narrow">
        <Styled.h1>{tag}</Styled.h1>
        {taggedItems.map(({ id, path, taggedItem }) => (
          // Gatsby Link uses `to` instaead of `href`.
          <Link as={GatsbyLink} key={id} to={path} sx={{ color: 'inherit' }}>
            <PostPreview post={taggedItem} mb={3} />
          </Link>
        ))}
        <Styled.h2>All tags</Styled.h2>
        <Tags
          values={pageContext.tags.map((value) => ({
            tag: `${value.tag} (${value.count})`,
            path: value.path,
          }))}
        />
      </Container>
    </Layout>
  );
};

ShadowedTagPage.propTypes = {
  data: object.isRequired,
  location: object.isRequired,
  pageContext: object.isRequired,
};

export default ShadowedTagPage;
