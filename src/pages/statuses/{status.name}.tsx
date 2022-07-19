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

export default function statusPage({
  data,
}: PageProps<Queries.StatusPageQuery>) {
  if (data.status === null) throw "null status"; // typing

  return (
    <>
      <Helmet>
        <title>{data.status.localizedName}</title>
      </Helmet>

      <Layout>
        <ContentHeader content={data.status} />
        <ContentTable
          content={data.status}
          tooltips={{
            damage: "Damage dealt per frame",
            reactive:
              "Whether this effect will only react with other effects and cannot be applied.",
            transitionDamage: "Damage dealt upon transition to this effect",
          }}
          overrides={{
            ...ContentTableHeaderOverrides,
            buildSpeedMultiplier: percentage,
            damageMultiplier: percentage,
            dragMultiplier: percentage,
            healthMultiplier: percentage,
            reloadMultiplier: percentage,
            speedMultiplier: percentage,
          }}
        />
        <Heading as="h2" fontSize="xl" mt={4} mb={2}>
          Connections
        </Heading>
        TODO floor.status liquid.effect bullet.status unit.immunities
        weather.status
      </Layout>
    </>
  );
}

export const query = graphql`
  query StatusPage($id: String!) {
    status(id: { eq: $id }) {
      buildSpeedMultiplier
      color {
        ...RGBA
      }
      damage
      damageMultiplier
      dragMultiplier
      healthMultiplier
      permanent
      reactive
      reloadMultiplier
      speedMultiplier
      transitionDamage

      ...ContentHeader
    }
  }
`;
