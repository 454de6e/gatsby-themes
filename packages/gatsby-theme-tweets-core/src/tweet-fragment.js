import { graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/graphql-reference/#fragments
export const fragment = graphql`
  fragment TweetFragment on Tweet {
    id
    collection
    title
    user
    description
    url
    thread
    tags
    image {
      childImageSharp {
        gatsbyImageData
      }
    }
    imageTitle
    imageAlt
    path
  }
`;
