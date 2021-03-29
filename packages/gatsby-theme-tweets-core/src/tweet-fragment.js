import { graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/graphql-reference/#fragments
export const fragment = graphql`
  fragment TweetFragment on Tweet {
    id
    collection
    title
    description
    url
    thread
    tags
    images {
      src {
        childImageSharp {
          gatsbyImageData
          original {
            src
          }
        }
      }
      title
      alt
    }
    links {
      title
      href
    }
    body
    path
  }
`;
