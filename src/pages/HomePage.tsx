import { useState } from "react";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import PostsPage from "@/pages/PostsPage";
import { useCurrentUser, usePostsLoading } from "@/contexts";
import { SearchBar, TextLink } from "@/components/ui";
import { TopProfilesBase } from "@/components";
import HomePageSkeletons from "./HomePageSkeleton";

const HomePage = () => {
  const currentUser = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState(""); // store what the user typed in the search bar
  const loading = usePostsLoading();

  return (
    <Box>
      <Box textAlign="center" mb={5}>
        {!currentUser ? (
          <>
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
          </>
        ) : (
          <HStack justify="center" align="baseline" gap={2} mb={5}>
            <Heading as="h1" size="3xl">
              forum20
            </Heading>
            <Text fontSize="2xl">latest posts</Text>
          </HStack>
        )}
        {/* show search bar and top profiles once posts have loaded: */}
        <SearchBar onSearch={setSearchTerm} />
        {currentUser && (
          <Box display={{ base: "block", lg: "none" }}>
            <TopProfilesBase />
          </Box>
        )}
      </Box>
      {loading && <HomePageSkeletons />}
      <PostsPage searchTerm={searchTerm} />
    </Box>
  );
};

export default HomePage;
