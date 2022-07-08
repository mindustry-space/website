import {
  Heading,
  Image,
  Skeleton,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../../components/layout";

export default function gameContentIndex({
  data,
}: PageProps<Queries.GameContentIndexQuery>) {
  return (
    <Layout>
      <Heading as="h1" fontSize="2xl" mb={2}>
        Blocks
      </Heading>
      <Wrap spacing={2}>
        {data.allBlock.nodes.map((block) => {
          return (
            <WrapItem margin={0}>
              <Link to={`/blocks/${block.name}`}>
                <Tooltip hasArrow label={block.localizedName}>
                  <svg height="2em" width="2em">
                    {/* rounded="sm" shadow="md" */}
                    <use
                      xlinkHref={`/images/svgs/aa310bd20/block.svg#block-${block.name}-ui`}
                    />
                  </svg>
                </Tooltip>
              </Link>
            </WrapItem>
          );
        })}
      </Wrap>
    </Layout>
  );
}

export const query = graphql`
  query GameContentIndex {
    allBlock(
      filter: { buildVisibility: { ne: "hidden" } }
      sort: { fields: gameId }
    ) {
      nodes {
        gameId
        localizedName
        name
      }
    }
  }
`;
