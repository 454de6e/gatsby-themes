import { graphql, useStaticQuery } from 'gatsby';

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteTwitter
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
