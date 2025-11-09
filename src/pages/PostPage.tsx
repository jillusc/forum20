import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Text, VStack } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import { useSetPosts } from "@/contexts/PostsContext";
import { CommentTemplate, PostTemplate } from "@/components";
import { AddCommentForm, EditCommentForm } from "@/components";
import type { Comment, Post } from "@/types";
import { fetchMoreData } from "@/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPageSkeleton from "./PostPageSkeleton";
import axios from "axios";
import { UIMessage } from "@/components/ui";
import { useToast } from "@/contexts";

const PostPage = () => {
  const { id } = useParams<{ id: string }>(); // grab the post ID from the URL
  const setPosts = useSetPosts();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null); // to store post data
  const [comments, setComments] = useState<{
    results: Comment[];
    next: string | null;
  }>({
    results: [],
    next: null,
  });
  const [loading, setLoading] = useState(true); // to track whether the API call is in progress
  const [error, setError] = useState<string | null>(null); // to store any fetch errors
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const showToast = useToast();

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return; // stop if the user cancels
    setDeletingPost(true);
    try {
      await axiosRes.delete(`/posts/${id}/`);
      showToast("Post deleted.");
      navigate(-1);
    } catch (err: unknown) {
      // TS type guard - safely confirms this is an Axios error:
      if (axios.isAxiosError(err)) {
        const data = err.response?.data; // safely access the backend's reponse (if any)
        if (!data) {
          console.error("Network or connection error:", err);
          setError("Network error — please try again.");
          return;
        }
        console.error("Backend error:", data); // log the raw data for debugging
        setError(
          typeof data === "string"
            ? data
            : data.detail ?? "Could not delete this post. Please try again."
        );
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setError("Something went wrong.");
      }
    } finally {
      setDeletingPost(false);
    }
  };

  const handleEditComment = (id: number) => setEditingCommentId(id);

  const handleDeleteComment = async (id: number) => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setComments((prev) => ({
        ...prev,
        results: prev.results.filter((comment) => comment.id !== id),
      }));
      // update the single post on PostPage:
      setPost((prev) =>
        prev
          ? { ...prev, comments_count: Math.max(prev.comments_count - 1, 0) }
          : prev
      );
      // update the same post inside the global posts context:
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === post?.id
            ? { ...post, comments_count: Math.max(post.comments_count - 1, 0) }
            : post
        ),
      }));
      showToast("Comment deleted.");
    } catch (err: unknown) {
      // TS type guard - safely confirms this is an Axios error:
      if (axios.isAxiosError(err)) {
        setError("Couldn't delete comment. Please try again.");
      } else {
        setError("Something went wrong.");
      }
    }
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
        setComments({
          results: commentsRes.data.results,
          next: commentsRes.data.next,
        });
        // ALSO update the (global) posts context:
        setPosts((prevPosts) => {
          // check if the post is already in context state:
          const exists = prevPosts.results.some(
            (post) => post.id === postRes.data.id
          );
          // if it does exist, update the existing post with new data:
          if (exists) {
            return {
              ...prevPosts,
              results: prevPosts.results.map((post) =>
                post.id === postRes.data.id ? postRes.data : post
              ),
            };
          }
          // and add the new post to the list:
          return {
            ...prevPosts,
            results: [...prevPosts.results, postRes.data],
          };
        });
      } catch (err: unknown) {
        // TS type guard - safely confirms this is an Axios error:
        if (axios.isAxiosError(err)) {
          const data = err.response?.data; // safely access the backend’s response (if any)
          if (!data) {
            console.error("Network or connection error:", err);
            setError("Network error - please try again.");
            return;
          }
          console.error("Backend error:", data); // log the raw data for debugging
          setError(
            typeof data === "string"
              ? data
              : data.detail ?? "Couldn't load post. Please try again."
          );
        } else {
          console.error("Unexpected error:", err); // log all other errors
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments(); // now call this async function
  }, [id]); // if the id changes, re-render (= re-fetch)

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <PostPageSkeleton />;
  if (error) return <UIMessage color="red">{error}</UIMessage>;
  if (!loading && !post) return <UIMessage>Post not found</UIMessage>;
  if (!post) return null; // also needed for TS

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
      <VStack gap={0} mx="auto" align="stretch" p={4}>
        <InfiniteScroll
          dataLength={comments.results.length} // how many posts are currently loaded
          next={() => fetchMoreData(comments, setComments)} // function to fetch the next page
          hasMore={!!comments.next}
          // true if there's a next page
          loader={
            <Text my={6} textAlign="center">
              Loading more comments...
            </Text>
          }
        >
          {comments.results.length ? (
            comments.results.map((comment) =>
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
        </InfiniteScroll>
      </VStack>
    </>
  );
};

export default PostPage;
