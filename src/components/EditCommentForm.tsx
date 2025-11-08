import { useEffect, useState } from "react";
import { HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button, FormStyles } from "@/components/ui";
import { axiosRes } from "@/api/axiosDefaults";
import type { Comment } from "@/types";
import axios from "axios";

interface Props {
  commentId: number;
  setComments: React.Dispatch<
    React.SetStateAction<{ results: Comment[]; next: string | null }>
  >;
  onCancel?: () => void; // optional - used in ActivityPage
}

interface Errors {
  content?: string;
  non_field_errors?: string;
}

const EditCommentForm = ({ commentId, setComments, onCancel }: Props) => {
  const [content, setContent] = useState<string>(""); // controlled input

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // upon mount, this fetches the existing comment:
  useEffect(() => {
    if (!commentId) return;
    const fetchComment = async () => {
      try {
        const { data } = await axiosRes.get(`/comments/${commentId}/`);
        setContent(data.content); // prefill textarea
      } catch (err) {
        setErrors({});
        console.error("Error fetching comment:", err);
      }
    };
    // next, call this async function:
    fetchComment();
  }, [commentId]);

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
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosRes.put(`/comments/${commentId}/`, {
        content,
      });
      setComments((prev) => ({
        ...prev, // keep the 'next' URL intact
        // replace existing comment with updated one in the same position:
        results: prev.results.map((c) => (c.id === data.id ? data : c)), // prepend the new comment
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
              "Couldn't update your comment. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error updating comment - something went wrong.",
        });
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
          {errors?.content && <Text color="red">{errors.content}</Text>}
          {errors?.non_field_errors && (
            <Text color="red">{errors.non_field_errors}</Text>
          )}{" "}
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
