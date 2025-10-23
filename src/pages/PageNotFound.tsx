import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { TextLink } from "@/components/ui";

const PageNotFound = () => {
  return (
    <Box
      width="400px"
      mx="auto"
      mt={8}
      px={4}
      py={8}
      borderWidth="2px"
      borderColor="primary"
      borderRadius="2xl"
    >
      <VStack align="center" gap={4}>
        <Heading as="h1" size="2xl">
          404 - Page not found
        </Heading>
        <Text fontSize="lg">The page you're looking for doesn't exist.</Text>
        <TextLink to="/">Go to the forum20 home page</TextLink>
      </VStack>
    </Box>
  );
};

export default PageNotFound;
