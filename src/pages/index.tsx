import * as React from 'react';
import ContentIcon from '../components/content-icon';
import Layout from '../components/layout';
import { graphql, Link, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import { up } from '../utils';
import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function Index({ data }: PageProps<Queries.IndexQuery>) {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={data.site?.siteMetadata?.description}
        />
      </Helmet>

      <Layout>
        <Box>
          <Heading as="h1" fontSize="3xl" fontWeight="bold">
            {data.site?.siteMetadata?.title}
          </Heading>
          <Text>{data.site?.siteMetadata?.description}</Text>
        </Box>
        <Divider my={4} />

        <SimpleGrid minChildWidth="10rem" spacing={2} my={2}>
          {data.allContent.group.map(({ fieldValue, nodes, totalCount }) => {
            let icon = undefined;
            if (fieldValue === "blocks") {
              icon = nodes.find((v) => v.visible);
            } else if (fieldValue === "statuses") {
              icon = nodes.find((v) => v.uiIcon !== "error");
            } else {
              icon = nodes[0];
            }

            return (
              <Link to={`/${fieldValue}/`}>
                <HStack
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                  padding="0.5rem"
                  spacing={2}
                  height="3.5rem"
                >
                  <ContentIcon content={icon} size="2.5rem" />
                  <Flex direction="column" h="2.5rem">
                    <Heading as="h3" fontSize="lg">
                      {up(fieldValue)}
                    </Heading>
                    <Spacer></Spacer>
                    <Text fontSize="xs">{totalCount}</Text>
                  </Flex>
                </HStack>
              </Link>
            );
          })}
        </SimpleGrid>
      </Layout>
    </>
  );
}

export const query = graphql`
  query Index {
    allContent(sort: { fields: gameId }) {
      group(field: contentType___pluralizedName) {
        fieldValue
        nodes {
          contentType {
            name
          }
          ... on MappableContent {
            name
          }
          ... on UnlockableContent {
            uiIcon
          }
          ... on Block {
            visible
          }
        }
        totalCount
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
