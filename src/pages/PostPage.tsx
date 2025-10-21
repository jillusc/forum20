import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Text, VStack } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import { useSetPosts } from "@/contexts/PostsContext";
import { CommentTemplate, PostTemplate } from "@/components";
import { AddCommentForm, EditCommentForm } from "@/components";
import type { Comment, Post } from "@/types";

const PostPage = () => {
  const { id } = useParams<{ id: string }>(); // grab the post ID from the URL
  const setPosts = useSetPosts();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null); // to store post data
  const [comments, setComments] = useState<Comment[]>([]); // to store the fetched comments
  const [loading, setLoading] = useState(true); // to track whether the API call is in progress
  const [error, setError] = useState<string | null>(null); // to store any fetch errors
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    await axiosRes.delete(`/posts/${id}/`);
    navigate(-2);
  };

  const handleEditComment = (id: number) => setEditingCommentId(id);

  const handleDeleteComment = async (id: number) => {
    await axiosRes.delete(`/comments/${id}/`);
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  // use useEffect to fetch the post and its comments when this component mounts
  useEffect(() => {
    if (!id) return; // if post ID is not available in the URL, do nothing
    // define an async function because we now need to fetch 2 things in parallel
    // and we await them with Promise.all for cleaner code:
    const fetchPostAndComments = async () => {
      try {
        // fetch both at the same time:
        const [postRes, commentsRes] = await Promise.all([
          axiosRes.get(`/posts/${id}/`),
          axiosRes.get(`/comments/?post=${id}`),
        ]);
        // ...and store their data in state:
        setPost(postRes.data);
        setComments(commentsRes.data.results);
        // ALSO update the (global) posts context:
        setPosts((prevPosts) => {
          // check if the post is already in context state:
          const exists = prevPosts.some((post) => post.id === postRes.data.id);
          // if it does exist, update the existing post with new data:
          if (exists) {
            return prevPosts.map((post) =>
              post.id === postRes.data.id ? postRes.data : post
            );
          }
          // and add the new post to the list:
          return [...prevPosts, postRes.data];
        });
      } catch (err: any) {
        if (err.response?.data) {
          setError(err.response.data); // check for + store backend error data
        } else {
          console.error(err); // log unexpected errors
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments(); // now call this async function
  }, [id]); // if the id changes, re-render (= re-fetch)

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <Text>Loading…</Text>;
  if (error) return <Text>{error}</Text>;
  if (!post) return <Text>Content not found</Text>;

  return (
    <>
      <Box p={4}>
        <PostTemplate
          post={post}
          setPost={setPost}
          postIsEditable={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCommentIconClick={() => setShowAddCommentForm((prev) => !prev)}
        />
        {showAddCommentForm && (
          <AddCommentForm
            postId={post.id}
            setPost={setPost}
            setComments={setComments}
            onCancel={() => setShowAddCommentForm(false)}
          />
        )}
      </Box>
      <VStack gap={0}>
        {comments.length ? (
          comments.map((comment) =>
            editingCommentId === comment.id ? (
              <Box key={comment.id} mx="auto" borderRadius="2xl">
                <EditCommentForm
                  key={comment.id}
                  commentId={comment.id}
                  setComments={setComments}
                  onCancel={() => setEditingCommentId(null)}
                />
              </Box>
            ) : (
              <CommentTemplate
                key={comment.id}
                comment={comment}
                handleEdit={() => handleEditComment(comment.id)}
                handleDelete={() => handleDeleteComment(comment.id)}
              />
            )
          )
        ) : (
          <Box maxWidth="768px" width="100%" mx="auto" p={4}>
            <Text textAlign="left">No comments yet</Text>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default PostPage;

// line 11: useParams() allows us to get URL parameters
