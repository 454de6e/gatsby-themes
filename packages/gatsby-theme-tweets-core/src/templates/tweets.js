import { graphql } from 'gatsby';

import TweetsPage from '../components/tweets-page';

export default TweetsPage;

export const query = graphql`
  query($collection: String!) {
    allTweet(
      sort: { fields: id, order: DESC }
      filter: { collection: { eq: $collection } }
    ) {
      nodes {
        ...TweetFragment
      }
    }
  }
`;
