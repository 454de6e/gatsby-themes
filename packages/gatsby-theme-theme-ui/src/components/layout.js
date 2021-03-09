import React from 'react';
import { node } from 'prop-types';
import { Box, Flex, Link, Themed } from 'theme-ui';
import { Global } from '@emotion/react';
import { GitHubIcon, SocialIcons, TwitterIcon } from '@maiertech/components';

import useSiteMetadata from '../use-site-metadata';

import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  const {
    siteTitle: title,
    siteAuthor: author,
    siteNavLinks: links,
  } = useSiteMetadata();
  // To make sticky footer work all elements up the hierarchy must set height to 100%.
  return (
    <Themed.root>
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
        <Box sx={{ flex: 1, mb: 4 }}>{children}</Box>
        <Box sx={{ flexShrink: 0 }}>
          <Footer
            title={title}
            name={author}
            links={links}
            socialIcons={
              <SocialIcons
                values={[
                  {
                    id: 'twitter',
                    icon: (
                      <Link
                        href="https://twitter.com/maiertech"
                        sx={{ color: 'inherit' }}
                      >
                        <TwitterIcon title="Follow me on Twitter" />
                      </Link>
                    ),
                  },
                  {
                    id: 'github',
                    icon: (
                      <Link
                        href="https://github.com/maiertech"
                        sx={{ color: 'inherit' }}
                      >
                        <GitHubIcon title="Follow me on GitHub" />
                      </Link>
                    ),
                  },
                ]}
                align="center"
                m={2}
              />
            }
          />
        </Box>
      </Flex>
    </Themed.root>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
