import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment PostFragment on Post {
    id
    collection
    title
    author
    date(formatString: "MMMM DD, YYYY")
    datetime: date(formatString: "YYYY-MM-DD")
    description
    tags
    body
    path
    canonicalUrl
  }
`;
