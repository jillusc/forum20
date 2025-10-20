import { Link as RouterLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

const TextLink = ({ children, to, onClick }: Props) => {
  const ChakraRouterLink = chakra(RouterLink);

  if (to) {
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
  }

  // fallback for click-only usage
  return (
    <chakra.span
      onClick={onClick}
      color="text"
      cursor="pointer"
      _hover={{
        fontWeight: "bold",
        color: "secondary",
        textDecoration: "none",
      }}
    >
      {children}
    </chakra.span>
  );
};

export default TextLink;
