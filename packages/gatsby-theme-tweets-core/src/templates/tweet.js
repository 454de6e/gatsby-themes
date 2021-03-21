import { graphql } from 'gatsby';

import TweetPage from '../components/tweet-page';

export default TweetPage;

export const query = graphql`
  query($id: String!) {
    tweet(id: { eq: $id }) {
      ...TweetFragment
    }
  }
`;
