import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Badge,
  Container,
  Flex,
  Heading,
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

function UF(str: string | null | undefined) {
  // uppercase first
  if (typeof str === "string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    return "None";
  }
}

export default function contentBlocksPage({
  data,
}: PageProps<Queries.ContentBlocksPageQuery>) {
  return (
    <Container maxW="3xl" mt={14} p={4}>
      <Flex mb={2}>
        <Flex direction="column" h="4em">
          <Heading as="h1" fontSize="3xl" fontWeight="bold">
            {data.block?.localizedName}
          </Heading>
          <Spacer></Spacer>
          <Text as="code">
            {data.block?.jsonId}, {data.block?.name}
          </Text>
        </Flex>

        <Spacer></Spacer>
        <Image
          rounded="md"
          shadow="md"
          h="4em"
          src={`https://raw.githubusercontent.com/MindustryGame/wiki/gh-pages/images/block-${data.block?.name}-ui.png`}
        ></Image>
      </Flex>

      <Text as="i" mt={2} align="justify">
        {data.block?.description}
      </Text>

      <Heading as="h2" fontSize="xl" mt={4}>
        Block properties
      </Heading>
      <Table variant="simple">
        <Tr>
          <Td>Build requirements</Td>
          <Td>
            <Wrap spacing={2}>
              {data.block?.requirements?.map((requirement) => {
                return (
                  <Text>
                    <Tooltip hasArrow label={requirement?.item?.localizedName}>
                      <Link to="#todo">
                        <Image
                          display="inline-block"
                          fallback={
                            <Skeleton h="1.125rem" w="1.125rem"></Skeleton>
                          }
                          h="1.125rem"
                          w="1.125rem"
                          src={`https://raw.githubusercontent.com/MindustryGame/wiki/gh-pages/images/item-${requirement?.item?.name}.png`}
                        ></Image>
                      </Link>
                    </Tooltip>
                    &times;{requirement?.amount}
                  </Text>
                );
              })}
            </Wrap>
          </Td>
        </Tr>
        <Tr>
          <Td>Build time</Td>
          <Td>
            {typeof data.block?.buildCost === "string"
              ? (data.block?.buildCost / 60).toFixed(2) + " seconds"
              : "Unknown"}
          </Td>
        </Tr>
        <Tr>
          <Td>Category</Td>
          <Td>
            {UF(data.block?.category)}
            {/* TODO: icon */}
          </Td>
        </Tr>
        <Tr>
          <Td>Health</Td>
          <Td>{data.block?.health}</Td>
        </Tr>
        <Tr>
          <Td>Size</Td>
          <Td>{data.block?.size}</Td>
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
            {/* TODO: unitModifier -> unit modifier */}
            {data.block?.flags?.length !== undefined &&
            data.block?.flags?.length > 0
              ? data.block?.flags?.map((flag) => <Badge>{flag}</Badge>)
              : "None"}
          </Td>
        </Tr>
        <Tr>
          <Td>
            Group
            <Tooltip label="All blocks in the same group can replace each other. For example, this property allows walls to replace each other as they are in the same group.">
              <InfoOutlineIcon ml={2} />
            </Tooltip>
          </Td>
          <Td>{UF(data.block?.group)}</Td>
        </Tr>
        <Tr>
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
          <Td>{UF(data.block?.priority)}</Td>
        </Tr>
      </Table>
    </Container>
  );
}

export const query = graphql`
  query ContentBlocksPage($id: String) {
    block(id: { eq: $id }) {
      buildCost
      category
      description
      flags
      group
      health
      jsonId
      localizedName
      name
      priority
      requirements {
        amount
        item {
          localizedName
          name
        }
      }
      size
    }
  }
`;
