import { useEffect, useState } from "react";
import { HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import { axiosRes } from "@/api/axiosDefaults";
import type { Comment } from "@/types";

interface Props {
  commentId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  onCancel?: () => void; // optional - used in ActivityPage
}

const EditCommentForm = ({ commentId, setComments, onCancel }: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // upon mount, this fetches the existing comment:
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await axiosRes.get(`/comments/${commentId}/`);
        setContent(data.content); // prefill textarea
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // next, call this async function:
    fetchComment();
  }, [commentId]);

  const handleCancel = () => {
    if (onCancel) onCancel(); // tells the parent to hide the form
    setContent("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosRes.put(`/comments/${commentId}/`, {
        content,
      });
      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? data : comment))
      );
      if (onCancel) onCancel(); // hide the form
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles maxWidth="768px" marginTop={0} marginBottom={0}>
        <VStack gap={4}>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minH="100px" // matches comment box
            w="100%"
            p={4}
            borderRadius="2xl"
            fontSize="md"
          />
          {error && <Text color="red">{error}</Text>}
          <HStack justify="center" gap={4}>
            <Button type="submit">Save</Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </HStack>
        </VStack>
      </FormStyles>
    </form>
  );
};

export default EditCommentForm;
