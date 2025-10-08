import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import { usePosts, useSetPosts } from "@/contexts/PostsContext";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { TopProfilesBase, PostTemplate } from "@/components";
import { SearchBar } from "@/components/ui";

interface Props {
  filter?: string; // takes an optional filter (for diff. versions of this page)
  message?: string; // text to show if no posts found
}

const PostsPage = ({
  filter = "",
  message = "No posts found.",
  isHomePage = false,
}: Props) => {
  const posts = usePosts();
  const setPosts = useSetPosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // store what the user typed in the search bar
  const currentUser = useCurrentUser();

  // use useEffect to fetch posts when this component mounts:
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // await the response and destructure data:
        const { data } = await axiosRes.get(`/posts/?${filter}`);
        setPosts(data.results); // take the response and store its data in state
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // call the async function
  }, [filter, searchTerm]); // if the filter or searchTerm value changes, re-render (= re-fetch)

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <Text>Loading posts...</Text>;
  if (error) return <Text>{error}</Text>;
  if (posts.length === 0) return <Text>{message}</Text>;

  return (
    <Box>
      <SearchBar onSearch={(text) => setSearchTerm(text)} />
      <Box display={{ base: "block", lg: "none" }}>
        {currentUser && <TopProfilesBase />}
      </Box>
      {posts.map((post) => (
        <Box key={post.id} mb={10}>
          <PostTemplate post={post} />
        </Box>
      ))}
    </Box>
  );
};

export default PostsPage;
