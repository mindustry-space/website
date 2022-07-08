import { Container } from "@chakra-ui/react";
import * as React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Container maxW="3xl">
      <Container maxW="inherit" my={8} p={0}>
        {children}
      </Container>
    </Container>
  );
}
