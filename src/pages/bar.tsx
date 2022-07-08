import {
  Button,
  Container,
  Grid,
  Spacer,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import * as React from "react";

const items = [
  "Blocks",
  "Items",
  "Liquids",
  "Maps",
  "Mods",
  "Plugins",
  "Schematics",
  "Sectors",
  "Status Effects",
  "Units",
];

export default function Index() {
  return (
    <Stack direction="row" padding={8}>
      <Stack backgroundColor="gray.50" direction="column">
        {items.map((item) => (
          <Link to={`/${item.toLowerCase().replace(" ", "-")}/`}>
            <Button variant="ghost">{item}</Button>
          </Link>
        ))}
      </Stack>
      <Container w="3xl">
        <Heading>Graphite Press</Heading>
      </Container>
      <Stack backgroundColor="gray.50" direction="column">
        {items.map((item) => (
          <Link to={`/${item.toLowerCase().replace(" ", "-")}/`}>
            <Button variant="ghost">{item}</Button>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
