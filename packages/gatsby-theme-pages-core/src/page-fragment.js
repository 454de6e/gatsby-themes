import { graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/graphql-reference/#fragments
export const fragment = graphql`
  fragment PageFragment on Page {
    id
    title
    description
    images {
      childImageSharp {
        gatsbyImageData
      }
    }
    body
    path
    canonicalUrl
  }
`;
