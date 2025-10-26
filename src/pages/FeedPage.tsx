import { useState } from "react";
import PostsPage from "@/pages/PostsPage";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { usePosts } from "@/contexts/PostsContext";
import { Box } from "@chakra-ui/react";
import { TopProfilesBase } from "@/components";
import { SearchBar } from "@/components/ui";
import FeedPageSkeletons from "./FeedPageSkeleton";

const FeedPage = () => {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.pk || "";
  const [searchTerm, setSearchTerm] = useState(""); // store what the user typed in the search bar
  const posts = usePosts(); // read posts from context

  const isLoading = posts.results.length === 0; // still loading if results empty

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      {isLoading ? (
        <FeedPageSkeletons />
      ) : (
        <Box display={{ base: "block", lg: "none" }}>
          <TopProfilesBase />
        </Box>
      )}
      <PostsPage
        filter={`owner__followed__owner__profile=${profileId}&`}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default FeedPage;
