import * as React from 'react';
import _ from 'lodash';
import ColorMenu from './color-menu';
import { camelToWords, round, up } from '../utils';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Heading,
  Table,
  Tr,
  Td,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tooltip,
} from "@chakra-ui/react";

export interface ContentTableProps {
  content: {
    [key: string]: any;
  };
  tooltips?: {
    [key: string]: JSX.Element | string;
  };
  overrides: {
    [key: string]:
      | JSX.Element
      | ((v: any) => JSX.Element | null | string)
      | null
      | string;
  };
}

export function ContentTable({
  content,
  tooltips,
  overrides,
}: ContentTableProps) {
  let tbody: { [key: string]: JSX.Element | string } = {};
  const overrideKeys = Object.keys(overrides);
  Object.entries(content).map(([k, v]) => {
    if (overrideKeys.includes(k)) {
      let override = overrides[k];
      if (typeof override === "function") {
        override = override(v);
      }
      if (override !== null) {
        tbody[k] = override;
      }
      return;
    }

    switch (typeof v) {
      case "boolean":
        tbody[k] = up(v.toString());
        break;

      case "number":
        tbody[k] = round(v).toString();
        break;

      case "object":
        if (v === null) break;

        const keys = Object.keys(v);
        if (_.isEqual(keys, ["r", "g", "b", "a"])) {
          tbody[k] = <ColorMenu color={v} />;
        }

        break;

      case "string":
        tbody[k] = up(v);
        break;
    }
  });

  return (
    <>
      <Heading as="h2" fontSize="xl" my={2}>
        Properties
      </Heading>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(tbody)
              .sort()
              .map(([k, v]) => {
                return (
                  <Tr>
                    <Td>
                      {camelToWords(k)}
                      {tooltips !== undefined && tooltips[k] ? (
                        <Tooltip hasArrow label={tooltips[k]}>
                          <InfoOutlineIcon ml={2} />
                        </Tooltip>
                      ) : null}
                    </Td>
                    <Td>{v}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ContentTable;
