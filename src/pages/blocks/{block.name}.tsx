import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Spacer,
  Table,
  Td,
  Text,
  Tooltip,
  Tr,
  Wrap,
} from "@chakra-ui/react";
import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";
import Layout from "../../components/layout";

import { path, ui, up } from "../../utils";

export default function contentBlocksPage({
  data,
}: PageProps<Queries.ContentBlocksPageQuery>) {
  if (data.block === null) throw "missing block";

  return (
    <Layout>
      <Flex mb={2}>
        <Flex direction="column" h="4em">
          <Heading as="h1" fontSize="3xl" fontWeight="bold">
            {data.block.localizedName}
          </Heading>
          <Spacer></Spacer>
          <Text as="code">
            {data.block.gameId}, {data.block.name}
          </Text>
        </Flex>

        <Spacer></Spacer>
        {ui(data.block, "4rem")}
      </Flex>

      <Text as="i" mt={2} align="justify">
        {data.block.description}
      </Text>

      <Heading as="h2" fontSize="xl" mt={4}>
        Block properties
      </Heading>
      <Table variant="simple">
        <Tr>
          <Td>Build requirements</Td>
          <Td>
            <Wrap spacing={2}>
              {data.block.requirements.map((requirement) => (
                <Link to={path(requirement.item)}>
                  <Tooltip hasArrow label={requirement.item.localizedName}>
                    <HStack spacing={0.5}>
                      {ui(requirement.item, "1.125rem", {
                        display: "inline-block",
                      })}
                      <Center as="span" h="1.125rem">
                        {requirement.amount}
                      </Center>
                    </HStack>
                  </Tooltip>
                </Link>
              ))}
            </Wrap>
          </Td>
        </Tr>
        <Tr>
          <Td>Build time</Td>
          <Td>{(data.block.buildCost / 60).toFixed(2) + " seconds"}</Td>
        </Tr>
        <Tr>
          <Td>Category</Td>
          <Td>
            {up(data.block.category)}
            {/* TODO: icon */}
          </Td>
        </Tr>
        <Tr>
          <Td>Health</Td>
          <Td>{data.block.health}</Td>
        </Tr>
        <Tr>
          <Td>Size</Td>
          <Td>{data.block.size}</Td>
        </Tr>
      </Table>

      <Heading as="h2" fontSize="xl" mt={4}>
        Internal properties
      </Heading>
      <Table variant="simple">
        <Tr>
          <Td>
            Flags
            <Tooltip label="Used by AI to index blocks.">
              <InfoOutlineIcon ml={2} />
            </Tooltip>
          </Td>
          <Td>
            <HStack>
              {/* TODO: unitModifier -> unit modifier */}
              {data.block.flags.length > 0
                ? [...data.block.flags]
                    .sort()
                    .map((flag) => <Badge>{flag}</Badge>)
                : "None"}
            </HStack>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Group
            <Tooltip label="All blocks in the same group can replace each other. For example, this property allows walls to replace each other as they are in the same group.">
              <InfoOutlineIcon ml={2} />
            </Tooltip>
          </Td>
          <Td>{up(data.block.group)}</Td>
        </Tr>
        {/* <Tr>
          <Td>
            Priority
            <Tooltip
              label={
                <Text>
                  Used by AI to target blocks. The highest priority is{" "}
                  <Text as="i">core</Text>, followed by{" "}
                  <Text as="i">turret</Text> and <Text as="i">base</Text>.
                </Text>
              }
            >
              <InfoOutlineIcon ml={2} />
            </Tooltip>
          </Td>
          <Td>{up(data.block?.priority)}</Td>
        </Tr> */}
      </Table>
    </Layout>
  );
}

export const query = graphql`
  query ContentBlocksPage($id: String) {
    block(id: { eq: $id }) {
      buildCost
      category
      contentType
      description
      flags
      group
      health
      gameId
      localizedName
      name
      priority
      requirements {
        amount
        item {
          contentType
          localizedName
          name
          uiIcon
        }
      }
      size
      uiIcon
    }
  }
`;
