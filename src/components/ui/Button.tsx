import { Button as ChakraButton, Spinner } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  variant = "solid",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}: Props) => {
  return (
    <ChakraButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      borderRadius="100px"
      minW="80px"
      textTransform="uppercase"
      fontSize="1rem"
      px="14px"
      py="4px"
      border="1px solid"
      borderColor="text"
      bg={variant === "solid" ? "text" : "#fff"}
      color={variant === "solid" ? "textWhite" : "text"}
      _hover={{
        borderColor: "secondary",
        bg: variant === "solid" ? "secondary" : "#fff",
        color: variant === "solid" ? "textWhite" : "secondary",
        fontWeight: "bold",
      }}
      _active={{
        bg: "secondary",
        borderColor: "secondary",
      }}
      _disabled={{
        borderColor: "text",
        bg: variant === "solid" ? "text" : "#fff",
        color: variant === "solid" ? "textWhite" : "text",
        cursor: "not-allowed",
      }}
      _focus={{
        boxShadow: "none",
      }}
      boxShadow="none"
    >
      {loading && <Spinner size="sm" />}
      {children}
    </ChakraButton>
  );
};

export default Button;
