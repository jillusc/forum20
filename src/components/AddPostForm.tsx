import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Button, FormField, FormStyles } from "@/components/ui";
import type { Errors } from "@/types";
import placeholderImage from "@/assets/post_image_placeholder.jpg";
import { axiosRes } from "@/api/axiosDefaults";
import axios from "axios";

const AddPostForm = () => {
  // controlled inputs:
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [artistName, setArtistName] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const handleCancel = () => {
    // reset all user input safely:
    setImage(null);
    setPreviewURL(placeholderImage);
    setTitle("");
    setContent("");
    setArtistName(null);
    setYear(null);
    setIsPrivate(false);
    setErrors({});
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // reset any previous errors before submit

    // required fields validation:
    if (!title.trim()) {
      setErrors({ title: "Title cannot be empty." });
      return; // stop submission
    }
    if (!content.trim()) {
      setErrors({ content: "Content cannot be empty." });
      return; // stop submission
    }
    if (!image) {
      setErrors({ image: "Please upload an image." });
      return; // stop submission
    }

    setSubmitting(true);

    // safely prepare formData for submission:
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    if (artistName) formData.append("artist_name", artistName);
    if (year !== null) formData.append("year_of_artwork", year.toString());
    formData.append("is_private", String(isPrivate));

    try {
      const { data } = await axiosRes.post("/posts/", formData);
      navigate(`/posts/${data.id}`); // redirect to the new post's page
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
          // convert backend field arrays into single strings:
          const formattedErrors = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              Array.isArray(value) ? value[0] : String(value),
            ])
          );
          setErrors({
            ...formattedErrors,
            non_field_errors:
              formattedErrors.non_field_errors ||
              data.detail ||
              "Couldn't submit your post. Please try again.",
          });
        }
      } else {
        console.error("Unexpected error:", err); // log all other errors
        setErrors({
          non_field_errors: "Error submitting post — something went wrong.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // cleanup function for when component unmounts or previewURL changes:
  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const isFormIncomplete = !title.trim() || !content.trim() || !image;

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles title="Create Post" maxWidth="736px">
        {errors.non_field_errors && (
          <Text color="red" textAlign="center" mb={3}>
            {errors.non_field_errors}
          </Text>
        )}
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <Text
            mb={3}
            cursor="pointer"
            _hover={{ color: "secondary", fontWeight: "bold" }}
          >
            Upload an image
          </Text>
          <Box
            display="flex"
            width="80%"
            mx="auto"
            justifyContent="center"
            maxH={{ base: "50vh", md: "60vh" }}
          >
            <img
              src={previewURL || placeholderImage}
              alt="image preview"
              style={{
                maxHeight: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Input
            id="image-upload"
            type="file"
            display="none"
            accept="image/*"
            onChange={(e) => {
              // controlled file input:
              const file = e.target.files?.[0] ?? null; // store the chosen file
              if (file) {
                setImage(file); // save image/file in state
                setPreviewURL(URL.createObjectURL(file)); // create new preview and save it in state
              } else {
                setImage(null);
                setPreviewURL(null);
              }
            }}
          />
          {errors.image && <Text color="red">{errors.image}</Text>}
        </label>
        <FormField label={<label htmlFor="title">Title</label>}>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
          {errors.title && <Text color="red">{errors.title}</Text>}
        </FormField>

        <FormField label={<label htmlFor="content">Content</label>}>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something about this..."
            rows={3}
          />
          {errors.content && <Text color="red">{errors.content}</Text>}
        </FormField>

        <FormField
          label={
            <label htmlFor="artist">
              Artist{" "}
              <Text as="span" fontSize="sm">
                (opt.){" "}
              </Text>
            </label>
          }
        >
          <Input
            id="artist"
            value={artistName ?? ""}
            onChange={(e) => setArtistName(e.target.value)}
            type="text"
            placeholder="Enter artist name"
          />
          {errors.artist_name && <Text color="red">{errors.artist_name}</Text>}
        </FormField>

        <Box display="flex" alignItems="center" gap={3}>
          <label htmlFor="year">
            Year{" "}
            <Text as="span" fontSize="sm">
              (opt.){" "}
            </Text>
          </label>
          <Input
            id="year"
            value={year ?? ""}
            onChange={(e) =>
              setYear(e.target.value === "" ? null : Number(e.target.value))
            }
            type="number"
            placeholder="e.g. 89"
            width="85px"
          />
          {errors.year_of_artwork && (
            <Text color="red">{errors.year_of_artwork}</Text>
          )}
        </Box>

        <label
          htmlFor="is-private"
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          Make this post visible only to followers
          <input
            id="is-private"
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            style={{ transform: "scale(1.2)", marginBottom: "1px" }}
          />
        </label>
        <HStack justify="center" gap={4}>
          <Button
            type="submit"
            loading={submitting}
            disabled={isFormIncomplete || submitting}
          >
            Create
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </HStack>
      </FormStyles>
    </form>
  );
};

export default AddPostForm;
