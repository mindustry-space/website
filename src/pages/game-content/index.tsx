import {
  Container,
  Heading,
  Image,
  Skeleton,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";

export default function gameContentIndex({
  data,
}: PageProps<Queries.GameContentIndexQuery>) {
  return (
    <Container maxW="3xl" mt={14} p={4}>
      <Heading as="h1" fontSize="2xl" mb={2}>
        Game Content
      </Heading>
      <Heading as="h2" fontSize="xl" mt={4} mb={2}>
        Blocks
      </Heading>
      <Wrap spacing={2}>
        {data.allBlock.nodes.map((block) => {
          return (
            <WrapItem margin={0}>
              <Link to={`/game-content/blocks/${block.name}`}>
                <Tooltip hasArrow label={block.localizedName}>
                  <Image
                    fallback={
                      <Skeleton
                        rounded="md"
                        shadow="md"
                        h="2em"
                        w="2em"
                      ></Skeleton>
                    }
                    h="2em"
                    w="2em"
                    rounded="sm"
                    shadow="md"
                    src={`https://raw.githubusercontent.com/MindustryGame/wiki/gh-pages/images/block-${block.name}-ui.png`}
                  ></Image>
                </Tooltip>
              </Link>
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
}

export const query = graphql`
  query GameContentIndex {
    allBlock(
      filter: { buildVisibility: { ne: "hidden" } }
      sort: { fields: jsonId }
    ) {
      nodes {
        jsonId
        localizedName
        name
      }
    }
  }
`;
