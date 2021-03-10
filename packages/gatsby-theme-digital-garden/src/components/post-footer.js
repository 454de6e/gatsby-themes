import React from 'react';
import { string } from 'prop-types';
import {
  Button,
  Flex,
  Text,
  Themed,
  TwitterIcon,
} from '@maiertech/gatsby-theme-theme-ui';

const PostFooter = ({ type, twitterUsername, onclick, ...props }) => (
  <Flex {...props} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
    <Themed.h2>{`Did you like this ${type}?`}</Themed.h2>
    <Themed.p>
      {`Follow me on Twitter for regular updates about new ${type}s.`}
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
  type: string.isRequired,
  twitterUsername: string.isRequired,
  onclick: string,
};

export default PostFooter;
