import * as React from 'react';
import ContentIcon from './content-icon';
import { graphql, Link } from 'gatsby';
import { SimpleGrid, Tooltip } from '@chakra-ui/react';

export interface ContentListProps extends React.SVGProps<SVGSVGElement> {
  contents: [
    {
      contentType: {
        name: string;
        pluralizedName: string;
      };
      localizedName: string;
      name: string;
      uiIcon: string;
    }
  ];
}

export function ContentList({ contents }: ContentListProps) {
  const size = "2rem";
  return (
    <SimpleGrid
      templateColumns="repeat(auto-fill, minmax(2rem, auto))"
      spacing={2}
      mt={2}
      mb={4}
    >
      {contents.map((content) => {
        return (
          <Tooltip hasArrow label={content.localizedName}>
            <Link to={`/${content.contentType.pluralizedName}/${content.name}`}>
              <ContentIcon content={content} size={size} />
            </Link>
          </Tooltip>
        );
      })}
    </SimpleGrid>
  );
}

export const query = graphql`
  fragment ContentList on UnlockableContent {
    contentType {
      name
      pluralizedName
    }
    localizedName
    name

    ...ContentIcon
  }
`;

export default ContentList;
