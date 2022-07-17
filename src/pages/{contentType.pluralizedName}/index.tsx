import * as React from 'react';
import ContentIcon from '../../components/content-icon';
import ContentList from '../../components/content-list';
import Layout from '../../components/layout';
import { camelToWords, up } from '../../utils';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { graphql, Link, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';
import {
  Divider,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Flex,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";

export default function contentTypeIndex({
  data,
}: PageProps<Queries.ContentTypeIndexQuery>) {
  const title = up(data.contentType?.pluralizedName);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Layout>
        <Heading as="h1" fontSize="3xl" mb={2}>
          {title}
        </Heading>

        <Divider my={2} />

        <Flex wrap="wrap" mb={4}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} ml={2} rightIcon={<ChevronDownIcon />}>
              Filter
            </MenuButton>
            <MenuList>
              <MenuOptionGroup title="Flags" type="checkbox">
                {[
                  "reactor",
                  "core",
                  "factory",
                  "repair",
                  "unitAssembler",
                  "turret",
                  "generator",
                  "extinguisher",
                  "storage",
                  "launchPad",
                  "unitCargoUnloadPoint",
                  "hasFogRadius",
                  "battery",
                ]
                  .sort()
                  .map((v) => (
                    <MenuItemOption value={v}>{camelToWords(v)}</MenuItemOption>
                  ))}
              </MenuOptionGroup>
              <MenuOptionGroup title="TODO" type="checkbox">
                <MenuItemOption value="todo">todo</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} ml={2} rightIcon={<ChevronDownIcon />}>
              Group
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue="id" type="radio">
                <MenuItemOption value="category">Category</MenuItemOption>
                <MenuItemOption value="todo">TODO</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} ml={2} rightIcon={<ChevronDownIcon />}>
              Sort
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue="id" type="radio">
                <MenuItemOption value="id">ID</MenuItemOption>
                <MenuItemOption value="name">Name</MenuItemOption>
                <MenuItemOption value="todo">TODO</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>

        <ContentList contents={data.allUnlockableContent.nodes} />
      </Layout>
    </>
  );
}

export const query = graphql`
  query ContentTypeIndex($id: String!) {
    allUnlockableContent(
      filter: { contentType: { id: { eq: $id } } }
      sort: { fields: gameId }
    ) {
      nodes {
        ...ContentList
      }
    }

    contentType(id: { eq: $id }) {
      pluralizedName
    }
  }
`;
