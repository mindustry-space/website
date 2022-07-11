import * as React from 'react';
import ContentIcon from '../../components/content-icon';
import ContentTable from '../../components/content-table';
import Layout from '../../components/layout';
import { camelToWords, path, round } from '../../utils';
import { graphql, Link, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import {
  Badge,
  Center,
  HStack,
  LinkBox,
  LinkOverlay,
  Tooltip,
  Wrap,
  Text,
} from "@chakra-ui/react";
import {
  ContentHeader,
  ContentTableHeaderOverrides,
} from "../../components/content-header";

export default function blockPage({ data }: PageProps<Queries.BlockPageQuery>) {
  if (data.block === null) throw "null block"; // typing

  return (
    <>
      <Helmet>
        <title>{data.block.localizedName}</title>
      </Helmet>

      <Layout>
        <ContentHeader content={data.block} />

        <ContentTable
          content={data.block}
          tooltips={{
            flags: "Used by AI to index blocks",
            group:
              "All blocks in the same group can replace each other. For example, this property allows walls to replace each other as they are in the same group.",
            priority: (
              <Text>
                Used by AI to target blocks. The highest priority is <i>core</i>
                , followed by <i>turret</i> and <i>base</i>.
              </Text>
            ),
          }}
          overrides={{
            ...ContentTableHeaderOverrides,
            buildCost: null,
            buildTime: `${round(data.block.buildCost / 60)} seconds`,
            details: null,
            flags: (
              <HStack>
                {[...data.block.flags].sort().map((v) => (
                  <Badge>{camelToWords(v)}</Badge>
                ))}
              </HStack>
            ),
            requirements: (
              <Wrap spacing={2}>
                {data.block.requirements.map((requirement) => (
                  <Tooltip hasArrow label={requirement.item.localizedName}>
                    <LinkBox as={HStack} spacing={0.5}>
                      <LinkOverlay as={Link} to={path(requirement.item)}>
                        <ContentIcon
                          content={requirement.item}
                          size="1.125rem"
                          display="inline-block"
                        />
                      </LinkOverlay>
                      <Center as="span" h="1.125rem">
                        {requirement.amount}
                      </Center>
                    </LinkBox>
                  </Tooltip>
                ))}
              </Wrap>
            ),
          }}
        />
      </Layout>
    </>
  );
}

export const query = graphql`
  query BlockPage($id: String!) {
    block(id: { eq: $id }) {
      buildCost
      category
      flags
      group
      health
      # mapColor {
      #   ...RGBA
      # }
      # outlineColor {
      #   ...RGBA
      # }
      priority
      requirements {
        amount
        item {
          localizedName
          name
          ...ContentIcon
        }
      }
      size

      ...ContentHeader
    }
  }
`;
