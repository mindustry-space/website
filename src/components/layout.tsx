import * as React from 'react';
import { Container } from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function Layout({ children }: React.PropsWithChildren) {
  const data: Queries.LayoutQuery = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const title = data.site?.siteMetadata?.title;
  if (!title) throw "null title"; // typing

  return (
    <>
      <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
        <html lang="en" />
      </Helmet>
      <Container maxW="3xl">
        <Container maxW="inherit" my={8} p={0}>
          {children}
        </Container>
      </Container>
    </>
  );
}
