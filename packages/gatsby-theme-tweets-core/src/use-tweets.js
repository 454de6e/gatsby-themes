import { useStaticQuery, graphql } from 'gatsby';
import { filterNodes } from '@maiertech/gatsby-helpers';

export const useTweets = (filter) => {
  // This static query cannot be restricted to a specific collection of tweets.
  // This can be done by applying a filter.
  const data = useStaticQuery(graphql`
    query {
      allTweet(sort: { fields: id, order: DESC }) {
        nodes {
          ...TweetFragment
        }
      }
    }
  `);

  return filterNodes(data, filter);
};
