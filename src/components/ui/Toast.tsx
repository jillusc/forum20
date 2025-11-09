import { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type = "success", onClose }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#4E6E58" : "red.500";

  return (
    <Box
      position="fixed"
      top="103px"
      left="50%"
      transform="translateX(-50%)"
      bg={bgColor}
      color="white"
      px={2}
      py={1}
      borderRadius="md"
      boxShadow="lg"
      zIndex={1000}
    >
      <Text fontWeight="medium">{message}</Text>
    </Box>
  );
};

export default Toast;
