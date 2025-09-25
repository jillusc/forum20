import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import PostsPage from "@/components/PostsPage";
import { TextLink } from "./ui";

const HomePage = () => {
  const currentUser = useCurrentUser();

  return (
    <Box>
      <Box textAlign="center" mb={5}>
        {!currentUser ? (
          <Box mb={5}>
            <Heading as="h1" size="4xl" mb={2}>
              forum20
            </Heading>
            <Text fontSize="2xl" mb={2}>
              Image sharing platform for 20th century art lovers.
            </Text>
            <TextLink to="/signup" aria-label="Sign up to join forum20">
              Join the community!
            </TextLink>
          </Box>
        ) : (
          <HStack justify="center" align="baseline" gap={2} mb={5}>
            <Heading as="h1" size="3xl">
              forum20
            </Heading>
            <Text fontSize="2xl">latest posts</Text>
          </HStack>
        )}
      </Box>
      <PostsPage message="No posts found." />
    </Box>
  );
};

export default HomePage;
