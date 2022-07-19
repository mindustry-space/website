import * as React from "react";
import ContentList from "../../components/content-list";
import ContentTable from "../../components/content-table";
import Layout from "../../components/layout";
import { Badge, Heading } from "@chakra-ui/react";
import { camelToWords, percentage, percentageDiff } from "../../utils";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import {
  ContentHeader,
  ContentTableHeaderOverrides,
} from "../../components/content-header";

export default function itemPage({ data }: PageProps<Queries.ItemPageQuery>) {
  if (data.item === null) throw "null item"; // typing

  return (
    <>
      <Helmet>
        <title>{data.item.localizedName}</title>
      </Helmet>

      <Layout>
        <ContentHeader content={data.item} />

        <ContentTable
          content={data.item}
          tooltips={{
            buildable:
              "Whether this item is used by buildings. If false, it will be incinerated in certain cores.",
            cost: "Used for calculating block place times. A block with 50 cost would take 50 ticks to build.",
            hardness:
              "Used to determine if an item can be mined by a specific drill as well as calculate drill speed.",
            healthScaling:
              "Used to scale a block's health when present in the build cost.",
            lowPriority:
              "Used by drills to calculate a dominant item when placed on multiple blocks with different item drops.",
          }}
          overrides={{
            ...ContentTableHeaderOverrides,
            charge: percentage,
            details: null,
            explosiveness: percentage,
            flammability: percentage,
            hardness: percentage,
            healthScaling: percentageDiff,
            radioactivity: percentage,
          }}
        />

        <Heading as="h2" fontSize="xl" mt={4} mb={2}>
          Connections
        </Heading>
        {Object.entries(data).map(([k, v]) =>
          k.endsWith("By") &&
          v.nodes.length > 0 &&
          (k === "mineableBy" ? data.droppedBy.nodes.length > 0 : true) ? (
            <>
              <Heading as="h3" fontSize="lg" my={2}>
                {camelToWords(k)}
                <Badge ml={2}>{v.nodes.length}</Badge>
              </Heading>
              <ContentList
                contents={
                  k === "mineableBy"
                    ? v.nodes.filter((v) => v.tier >= data.item?.hardness)
                    : v.nodes
                }
              />
            </>
          ) : null
        )}
      </Layout>
    </>
  );
}

export const query = graphql`
  query ItemPage($id: String!) {
    consumedBy: allBlock(
      filter: { itemFilter: { elemMatch: { item: { id: { eq: $id } } } } }
    ) {
      nodes {
        ...ContentList
      }
    }

    droppedBy: allBlock(filter: { itemDrop: { id: { eq: $id } } }) {
      nodes {
        ...ContentList
      }
    }

    mineableBy: allBlock(
      filter: {
        blockedItem: { id: { ne: $id } }
        drillTime: { ne: null }
        tier: { ne: null }
      }
    ) {
      nodes {
        ...ContentList
        tier
      }
    }

    producedBy: allBlock(
      filter: { outputItems: { elemMatch: { item: { id: { eq: $id } } } } }
    ) {
      nodes {
        ...ContentList
      }
    }

    requiredBy: allBlock(
      filter: { requirements: { elemMatch: { item: { id: { eq: $id } } } } }
    ) {
      nodes {
        ...ContentList
      }
    }

    # TechNode, pulverizer todo
    # requiredToResearch: allBlock(
    #   filter: { researchCost: { elemMatch: { item: { id: { eq: $id } } } } }
    # ) {
    #   nodes {
    #     ...ContentList
    #   }
    # }

    item(id: { eq: $id }) {
      buildable
      charge
      color {
        ...RGBA
      }
      cost
      explosiveness
      flammability
      hardness
      healthScaling
      lowPriority
      radioactivity

      ...ContentHeader
    }
  }
`;
