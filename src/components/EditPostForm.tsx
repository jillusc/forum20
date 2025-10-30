import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Button, FormField, FormStyles } from "@/components/ui";
import type { Errors } from "@/types";
import placeholderImage from "@/assets/post_image_placeholder.jpg";
import { axiosRes } from "@/api/axiosDefaults";

const EditPostForm = () => {
  const { id } = useParams(); // grab the id part of the URL and store it
  if (!id) return <Text>Invalid post ID</Text>;
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [artistName, setArtistName] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Errors>({});

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setArtistName(null);
    setYear(null);
    setImage(null);
    setPreviewURL(placeholderImage);
    setIsPrivate(false);
    setErrors({});
    navigate(-2);
  };

  // upon mount, this fetches the existing post:
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosRes.get(`/posts/${id}/`);
        // set all state values so inputs are prefilled:
        setTitle(data.title);
        setContent(data.content);
        setArtistName(data.artist_name || null);
        setYear(data.year_of_artwork || null);
        setIsPrivate(data.is_private);
        setImage(null); // keep null, user can upload a new one if they want
        setPreviewURL(data.image || null); // show existing image as preview
      } catch (err) {
        setErrors({});
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // next, call this async function:
    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    if (artistName) formData.append("artist_name", artistName);
    if (year !== null) formData.append("year_of_artwork", year.toString());
    formData.append("is_private", String(isPrivate));

    try {
      const { data } = await axiosRes.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}`); // redirect to the new post's page
    } catch (err: any) {
      if (err.response?.data) {
        setErrors(err.response.data); // check for + store backend error data
      } else {
        console.error(err); // log unexpected errors
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // cleanup function for when component unmounts or previewURL or avatar changes:
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  return (
    <form onSubmit={handleSubmit}>
      <FormStyles title="Edit Post" maxWidth="736px">
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <Text
            mb={3}
            cursor="pointer"
            _hover={{ color: "secondary", fontWeight: "bold" }}
          >
            Change the image
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

        <HStack justify="center" gap={4} my={1}>
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </HStack>
      </FormStyles>
    </form>
  );
};

export default EditPostForm;
