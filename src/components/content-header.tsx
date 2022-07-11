import * as React from 'react';
import ContentIcon from './content-icon';
import {
  Divider,
  Flex,
  Heading,
  Spacer,
  Text
  } from '@chakra-ui/react';
import { graphql } from 'gatsby';

export interface ContentHeaderProps {
  content: {
    __typename: string;
    contentType: {
      name: string;
    };
    description?: string | null;
    gameId: number;
    localizedName?: string;
    name?: string;
    uiIcon?: string;
  };
}

export const ContentTableHeaderOverrides = [
  "__typename",
  "description",
  "gameId",
  "localizedName",
  "name",
  "uiIcon",
].reduce((prev, v) => ({ ...prev, [v]: null }), {});

export function ContentHeader({ content }: ContentHeaderProps) {
  // TODO: UnlockableContent.details
  return (
    <>
      <Flex mb={2}>
        <Flex direction="column" h="4rem">
          <Heading as="h1" fontSize="3xl">
            {content.localizedName
              ? content.localizedName
              : `${content.contentType.name}#${content.gameId}`}
          </Heading>
          <Spacer></Spacer>
          {content.name ? (
            <Text as="code">
              {content.gameId}, {content.name}
            </Text>
          ) : null}
        </Flex>

        {content.uiIcon ? (
          <>
            <Spacer></Spacer>
            <ContentIcon
              content={{
                // typing bug much?
                contentType: content.contentType,
                uiIcon: content.uiIcon,
              }}
              size="4rem"
            />
          </>
        ) : null}
      </Flex>

      {content.description ? (
        <Text mt={2} align="justify">
          {content.description}
        </Text>
      ) : null}

      <Divider my={4} />
    </>
  );
}

export const query = graphql`
  fragment ContentHeader on Content {
    __typename
    gameId
    ... on MappableContent {
      name
    }
    ... on UnlockableContent {
      description
      localizedName
    }

    ...ContentIcon
  }
`;

export default ContentHeader;
