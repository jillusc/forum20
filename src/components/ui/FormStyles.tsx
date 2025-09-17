import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

interface Props {
  title?: string;
  children: React.ReactNode;
  bottomText?: React.ReactNode;
  maxWidth?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
}

const FormStyles = ({
  title,
  children,
  bottomText,
  maxWidth = 400,
  marginTop = 10,
  marginBottom = 6,
}: Props) => {
  return (
    <Box
      maxWidth={maxWidth}
      width="100%"
      mx="auto"
      marginTop={marginTop}
      marginBottom={marginBottom}
      py={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderWidth="2px"
      borderColor="primary"
      borderRadius="2xl"
    >
      <Heading marginBottom={marginBottom}>{title}</Heading>

      <VStack width="80%" align="stretch" gap={4}>
        {children}
      </VStack>

      {bottomText && (
        <Box textAlign="center" marginTop={6}>
          {bottomText}
        </Box>
      )}
    </Box>
  );
};

export default FormStyles;
