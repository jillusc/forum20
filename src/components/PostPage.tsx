import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import PostTemplate from "@/components/PostTemplate";
import type { Post } from "../types";

const PostPage = () => {
  const { id } = useParams<{ id: string }>(); // grab the post ID from the URL
  const [post, setPost] = useState<Post | null>(null); // to store post data
  const [loading, setLoading] = useState(true); // to track whether the API call is in progress
  const [error, setError] = useState<string | null>(null); // to store any fetch errors

  // use useEffect to fetch the post when this component mounts
  useEffect(() => {
    if (!id) return; // if post ID is not available in the URL, do nothing
    axios
      .get(`/posts/${id}/`)
      // take the response...
      .then((res) => {
        setPost(res.data); // ...and store its data in state
      })
      .catch((err: any) => {
        if (err.response?.data) {
          setError(err.response.data); // check for + store backend error data
        } else {
          console.error(err); // log unexpected errors
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // if the id changes, re-render (= re-fetch)

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <Text>Loading…</Text>;
  if (error) return <Text>{error}</Text>;
  if (!post) return <Text>Post not found</Text>;

  return (
    <Box p={4}>
      <PostTemplate post={post} />
      {/* Comments section will go here */}
    </Box>
  );
};

export default PostPage;

// line 9: useParams() allows us to get URL parameters
