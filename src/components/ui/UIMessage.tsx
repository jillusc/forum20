import { Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export const UIMessage = ({
  children,
  color = "inherit",
}: {
  children: ReactNode;
  color?: string;
}) => (
  <Text my={6} textAlign="center" color={color}>
    {children}
  </Text>
);
