import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { ui, up } from "../utils";
import pluralize from "pluralize";

export default function Index({ data }: PageProps<Queries.IndexQuery>) {
  const contentTypes = [
    "block",
    "item",
    "liquid",
    "status",
    "unit",
    "weather",
  ].map((v: string) => {
    return {
      count: data[`all${up(v)}`].totalCount,
      content: data[v].nodes[0],
      type: v,
    };
  });
  return (
    <Layout>
      <Box>
        <Heading as="h1" fontSize="3xl" fontWeight="bold">
          {data.site?.siteMetadata?.title}
        </Heading>
        <Text>{data.site?.siteMetadata?.description}</Text>
      </Box>
      <Divider my={4} />

      <SimpleGrid minChildWidth="10rem" spacing={2} my={2}>
        {contentTypes.map(({ count, content, type }) => {
          return (
            <Link to={`/${pluralize(type)}/`}>
              <HStack
                borderWidth="1px"
                rounded="md"
                shadow="md"
                padding="0.5rem"
                spacing={2}
                height="3.5rem"
              >
                <>{ui(content, "2.5rem")}</>
                <Flex direction="column" h="2.5rem">
                  <Heading as="h3" fontSize="lg">
                    {up(pluralize(type))}
                  </Heading>
                  <Spacer></Spacer>
                  <Text fontSize="xs">{count}</Text>
                </Flex>
              </HStack>
            </Link>
          );
        })}
      </SimpleGrid>
    </Layout>
  );
}

export const query = graphql`
  query Index {
    allBlock {
      totalCount
    }
    block: allBlock(
      filter: { visible: { eq: true } }
      limit: 1
      sort: { fields: gameId }
    ) {
      nodes {
        contentType
        uiIcon
      }
    }
    allItem {
      totalCount
    }
    item: allItem(limit: 1, sort: { fields: gameId }) {
      nodes {
        contentType
        uiIcon
      }
    }
    allLiquid {
      totalCount
    }
    liquid: allLiquid(limit: 1, sort: { fields: gameId }) {
      nodes {
        contentType
        uiIcon
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
    allStatus {
      totalCount
    }
    status: allStatus(
      filter: { uiIcon: { ne: "error" } }
      limit: 1
      sort: { fields: gameId }
    ) {
      nodes {
        contentType
        uiIcon
      }
    }
    allUnit {
      totalCount
    }
    unit: allUnit(limit: 1, sort: { fields: gameId }) {
      nodes {
        contentType
        uiIcon
      }
    }
    allWeather {
      totalCount
    }
    weather: allWeather(limit: 1, sort: { fields: gameId }) {
      nodes {
        contentType
        uiIcon
      }
    }
  }
`;
