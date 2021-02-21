import React from 'react';
import { string } from 'prop-types';
import {
  Button,
  Flex,
  Text,
  Themed,
  TwitterIcon,
} from '@maiertech/gatsby-theme-theme-ui';

const PostFooter = ({ twitterUsername, ...props }) => (
  <Flex {...props} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
    <Themed.h2>Did you like this post?</Themed.h2>
    <Themed.p>
      My goal is to create helpful content for web developers in my digital
      garden. Follow me on Twitter for regular updates about new posts.
    </Themed.p>
    <Button as="a" href={`https://twitter.com/${twitterUsername}`}>
      <Flex sx={{ alignItems: 'center' }}>
        <TwitterIcon mr={2} />
        <Text sx={{ fontWeight: 'bold' }}>{`Follow @${twitterUsername}`}</Text>
      </Flex>
    </Button>
  </Flex>
);

PostFooter.propTypes = {
  twitterUsername: string.isRequired,
};

export default PostFooter;
