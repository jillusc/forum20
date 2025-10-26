import { useState } from "react";
import PostsPage from "@/pages/PostsPage";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { Box } from "@chakra-ui/react";
import { TopProfilesBase } from "@/components";
import { SearchBar } from "@/components/ui";

const FeedPage = () => {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.pk || "";
  const [searchTerm, setSearchTerm] = useState(""); // store what the user typed in the search bar

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <Box display={{ base: "block", lg: "none" }}>
        <TopProfilesBase />
      </Box>
      <PostsPage
        filter={`owner__followed__owner__profile=${profileId}&`}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default FeedPage;
