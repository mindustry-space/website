import * as React from "react";
import { graphql } from "gatsby";

export interface ContentIconProps extends React.SVGProps<SVGSVGElement> {
  content: {
    contentType: {
      name: string;
    };
    uiIcon: string;
  };
  size: string;
}

export function ContentIcon({ content, size, ...rest }: ContentIconProps) {
  return (
    <svg height={size} width={size} {...rest}>
      <use
        xlinkHref={`/images/svgs/${content.contentType.name}.svg#${content.uiIcon}`}
      />
    </svg>
  );
}

export const query = graphql`
  fragment ContentIcon on UnlockableContent {
    contentType {
      name
    }
    uiIcon
  }
`;

export default ContentIcon;
