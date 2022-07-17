import * as React from 'react';
import a11yPlugin from 'colord/plugins/a11y';
import { CheckIcon, ChevronDownIcon, CopyIcon } from '@chakra-ui/icons';
import { colord, extend } from 'colord';
import { graphql } from 'gatsby';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
} from "@chakra-ui/react";

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorMenuProps {
  color: RGBA;
}

const white = colord("#fff");
extend([a11yPlugin]);

function rgba1Torgba255(color: RGBA): RGBA {
  return {
    r: color.r * 255,
    g: color.g * 255,
    b: color.b * 255,
    a: color.a * 255,
  };
}

export function ColorMenu({ color }: ColorMenuProps) {
  let color255 = rgba1Torgba255(color);

  const c = colord(color255);
  const props = {
    backgroundColor: c.alpha(1).toHex(),
    color: white.isReadable(c) ? "#fff" : "#000",
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        backgroundColor={c.alpha(1).toHex()}
        color={white.isReadable(c) ? "#fff" : "#000"}
        rounded="md"
        pl={1}
      >
        {c.toHex()}
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        {[c.toHex(), c.toHslString(), c.toRgbString()].map((v) => {
          const { hasCopied, onCopy } = useClipboard(v);
          return (
            <MenuItem
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              onClick={onCopy}
            >
              {v}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export const query = graphql`
  fragment RGBA on Color {
    r
    g
    b
    a
  }
`;

export default ColorMenu;
