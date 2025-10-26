import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Text } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import {
  usePosts,
  usePostsLoading,
  useSetPosts,
  useSetPostsLoading,
} from "@/contexts/PostsContext";
import { PostTemplate } from "@/components";
import { fetchMoreData } from "@/utils/utils";

interface Props {
  filter?: string; // takes an optional filter (for diff. versions of this page)
  message?: string; // text to show if no posts found
  searchTerm?: string; // passed down from parent
}

const PostsPage = ({
  filter = "",
  message = "No posts match your search.",
  searchTerm = "",
}: Props) => {
  const posts = usePosts();
  const setPosts = useSetPosts();
  const loading = usePostsLoading();
  const setLoading = useSetPostsLoading();
  const [error, setError] = useState<string | null>(null);

  // use useEffect to fetch posts when this component mounts:
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // await the response and destructure data:
        const { data } = await axiosRes.get(
          `/posts/?${filter}&search=${searchTerm}`
        );
        // take the response and store its data in state:
        setPosts({ results: data.results, next: data.next });
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); // call the async function
  }, [filter, searchTerm, setPosts, setLoading]);

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading)
    return (
      <Text my={6} textAlign="center">
        Loading posts...
      </Text>
    );
  if (error) return <Text>{error}</Text>;
  if (posts.results.length === 0) return <Text>{message}</Text>;

  return (
    <Box>
      <InfiniteScroll
        dataLength={posts.results.length} // how many posts are currently loaded
        next={() => fetchMoreData(posts, setPosts)} // function to fetch the next page
        hasMore={!!posts.next} // true if there’s a next page
        loader={
          <Text my={6} textAlign="center">
            Loading more posts...
          </Text>
        } // show while loading
        endMessage={
          <Text my={6} textAlign="center">
            You have reached the end...
          </Text>
        }
      >
        {/* Outer container: sets up a horizontal flex layout for the two columns: */}
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          {/* Map over [0, 1] to create two columns dynamically */}
          {[0, 1].map((colIndex) => (
            <Box
              key={colIndex}
              flex="1" // Each column takes equal width
              display="flex"
              flexDirection="column" // Stack posts vertically within each column
              gap={0} // Vertical spacing between posts
            >
              {/* Filter the posts object's results array so that even-indexed posts go in column 0 and odd-indexed posts go in column 1 */}
              {posts.results
                .filter((_, i) => i % 2 === colIndex)
                .map((post) => (
                  <PostTemplate key={post.id} post={post} />
                ))}
            </Box>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default PostsPage;

// line 98:
// "For each post in the array, look (only) at its position in the list (i)."
// "Compute i % 2 (0 = even positions, 1 = odd)."
// "Keep the post if its index modulo 2 equals the column number (colIndex)."
// Column 0 keeps posts at indexes 0, 2, 4…
// Column 1 keeps posts at indexes 1, 3, 5…
// (N.B. We ignore the post itself (_) because the filter only needs the index to decide which column it goes into.)
