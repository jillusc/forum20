import { useState } from "react";
import { HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import type { Comment, Post } from "@/types";
import { axiosRes } from "@/api/axiosDefaults";

interface Props {
  postId: number;
  setPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  onCancel?: () => void;
}

const AddCommentForm = ({ postId, setPost, setComments, onCancel }: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = () => {
    if (onCancel) onCancel(); // tells the parent to hide the form
    setContent("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset previous error
    setLoading(true);
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post: postId,
      });
      setComments((prev) => [data, ...prev]);
      setPost((prev) =>
        prev ? { ...prev, comments_count: prev.comments_count + 1 } : prev
      );
      setContent("");
      if (onCancel) onCancel(); // hides the form after creating
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
          {error && <Text color="red">{error}</Text>}
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
