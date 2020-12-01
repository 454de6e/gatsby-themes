import React from 'react';
import { node } from 'prop-types';
import { Footer, Header } from '@maiertech/components';
import { Box, Flex, Styled } from 'theme-ui';
import { Global } from '@emotion/react';

import useSiteMetadata from '../use-site-metadata';

const links = [
  { href: '/posts/', text: 'Posts' },
  { href: '/notes/', text: 'Notes' },
];

const Layout = ({ children }) => {
  const { siteTitle: title, siteAuthor: author } = useSiteMetadata();
  // To make sticky footer work all elements up the hierarchy must set height to 100%.
  return (
    <Styled.root>
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper, #gatsby-focus-wrapper > div': {
            height: '100%',
          },
        }}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Header title={title} links={links} mb={[3, 4]} />
        </Box>
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Box sx={{ flexShrink: 0 }}>
          <Footer title={title} name={author} links={links} />
        </Box>
      </Flex>
    </Styled.root>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
