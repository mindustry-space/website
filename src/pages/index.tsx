import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Container,
  Divider,
  Flex,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { graphql, Link } from "gatsby";
import * as React from "react";

const contentTypes = [
  {
    image: "block-graphite-press-ui",
    title: "Blocks",
    number: 242,
  },
  {
    image: "item-copper",
    title: "Items",
    number: 16,
  },
  {
    image: "liquid-water",
    title: "Liquids",
    number: 5,
  },
  {
    image: "unit-dagger-ui",
    title: "Units",
    number: 27,
  },
];

export default function gridListWithCTA({ data }) {
  return (
    <Box as={Container} maxW="3xl" mt={14} p={4}>
      <Box>
        <Heading as="h1" fontSize="3xl" fontWeight="bold">
          {data.site.siteMetadata.title}
        </Heading>
        <Text>{data.site.siteMetadata.description}</Text>
      </Box>
      <Divider my={4} />
      <Box>
        <Heading as="h2" fontSize="2xl">
          <Link to="/game-content/">
            Game content
            <ArrowForwardIcon ml={1}></ArrowForwardIcon>
          </Link>
        </Heading>
        <SimpleGrid minChildWidth="10rem" spacing={2} my={2}>
          {contentTypes.map((type) => {
            return (
              <Link to={`/game-content/#${type.title}`}>
                <HStack
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                  padding="0.5rem"
                  spacing={2}
                  height="3.5rem"
                >
                  <Image
                    rounded="md"
                    h="2.5rem"
                    w="2.5rem"
                    fallback={<Skeleton h="2.5rem" w="2.5rem"></Skeleton>}
                    src={`https://raw.githubusercontent.com/MindustryGame/wiki/gh-pages/images/${type.image}.png`}
                  ></Image>
                  <Flex direction="column" h="2.5rem">
                    <Heading as="h3" fontSize="lg">
                      {type.title}
                    </Heading>
                    <Spacer></Spacer>
                    <Text fontSize="xs">{type.number}</Text>
                  </Flex>
                </HStack>
              </Link>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export const query = graphql`
  query HomePageQuery {
    allBlock {
      totalCount
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
