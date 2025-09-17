import { Link as RouterLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  to: string;
}

const TextLink = ({ children, to }: Props) => {
  const ChakraRouterLink = chakra(RouterLink);

  return (
    <ChakraRouterLink
      to={to}
      color="secondary"
      textDecoration="underline"
      cursor="pointer"
      _hover={{ fontWeight: "bold", textDecoration: "none" }}
    >
      {children}
    </ChakraRouterLink>
  );
};

export default TextLink;
