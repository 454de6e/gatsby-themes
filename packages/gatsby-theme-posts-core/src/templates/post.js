import { graphql } from 'gatsby';

import PostPage from '../components/post-page';

export default PostPage;

export const query = graphql`
  query($id: String!) {
    post(id: { eq: $id }) {
      ...PostFragment
    }
  }
`;
