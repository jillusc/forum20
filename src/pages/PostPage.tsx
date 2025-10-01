import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import { useSetPosts } from "@/contexts/PostsContext";
import PostTemplate from "@/components/PostTemplate";
import type { Post } from "@/types";

const PostPage = () => {
  const { id } = useParams<{ id: string }>(); // grab the post ID from the URL
  const setPosts = useSetPosts();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null); // to store post data
  const [loading, setLoading] = useState(true); // to track whether the API call is in progress
  const [error, setError] = useState<string | null>(null); // to store any fetch errors

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    await axiosRes.delete(`/posts/${id}/`);
    navigate(-2);
  };

  // use useEffect to fetch the post when this component mounts
  useEffect(() => {
    if (!id) return; // if post ID is not available in the URL, do nothing
    axiosRes
      .get(`/posts/${id}/`)
      // take the response...
      .then((res) => {
        setPost(res.data); // ...and store its data in state.
        // ALSO save the changes in the (global) context:
        setPosts((prevPosts) => {
          // check if the post is already in context state:
          const exists = prevPosts.some((post) => post.id === res.data.id);
          if (exists) {
            // update the existing post with new data
            return prevPosts.map((post) =>
              post.id === res.data.id ? res.data : post
            );
          } else {
            // add the new post to the list:
            return [...prevPosts, res.data];
          }
        });
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
  if (!post) return <Text>Content not found</Text>;

  return (
    <Box p={4}>
      <PostTemplate
        post={post}
        setPost={setPost}
        postIsEditable={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Comments section will go here */}
    </Box>
  );
};

export default PostPage;

// line 10: useParams() allows us to get URL parameters
