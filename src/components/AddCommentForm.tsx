import { useState } from "react";
import { HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import type { Comment, Post } from "@/types";
import { useSetPosts } from "@/contexts/PostsContext";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";

interface Props {
  postId: number;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setComments: React.Dispatch<
    React.SetStateAction<{ results: Comment[]; next: string | null }>
  >;
  onCancel?: () => void;
}

interface Errors {
  content?: string;
  non_field_errors?: string;
}

const AddCommentForm = ({ postId, setPost, setComments, onCancel }: Props) => {
  const [content, setContent] = useState<string>(""); // controlled input
  const setPosts = useSetPosts();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  if (!postId) return <Text>Invalid post ID</Text>;

  const handleCancel = () => {
    if (onCancel) onCancel(); // tells the parent to hide the form
    setContent(""); // reset user input safely
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required field validation:
    if (!content.trim()) {
      setErrors({ content: "Comment cannot be empty." });
      return; // stop submission
    }

    setLoading(true);
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post: postId,
      });
      setComments((prev) => ({
        ...prev, // keep the 'next' URL intact
        results: [data, ...prev.results], // prepend the new comment
      }));
      setPost((prev) =>
        prev ? { ...prev, comments_count: prev.comments_count + 1 } : prev
      );
      setPosts((prev) => ({
        ...prev,
        results: prev.results.map((post) =>
          post.id === postId
            ? { ...post, comments_count: post.comments_count + 1 }
            : post
        ),
      }));
      setContent(""); // clear input after successful submit
      if (onCancel) onCancel(); // hide the form
    } catch (err: unknown) {
      // TS type guard - safely confirms this is an Axios error:
      if (axios.isAxiosError(err)) {
        const data = err.response?.data; // safely access the backend's reponse (if any)
        if (!data) {
          console.error("Network or connection error:", err);
          setErrors({ non_field_errors: "Network error — please try again." });
          return;
        }
        console.error("Backend error:", data); // log the raw data for debugging
        if (typeof data === "string") {
          setErrors({ non_field_errors: data });
        } else {
          setErrors({
            content: data.content?.[0],
            non_field_errors:
              data.non_field_errors?.[0] ||
              data.detail ||
              "Couldn't post your comment. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error posting comment - something went wrong.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles maxWidth="768px" marginTop={0} marginBottom={0}>
        <VStack width="90%" gap={4}>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
          />
          {errors?.content && <Text color="red">{errors.content}</Text>}
          {errors?.non_field_errors && (
            <Text color="red">{errors.non_field_errors}</Text>
          )}
          <HStack justify="center" gap={4}>
            <Button type="submit">Create</Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      </FormStyles>
    </form>
  );
};

export default AddCommentForm;
