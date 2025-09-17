import { useState } from "react";
import { Box, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Button, FormField, FormStyles } from "@/components/ui";

const AddPostForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [artistName, setArtistName] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <form>
      <FormStyles title="Create Post" maxWidth="700px">
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
              src="/src/assets/post_image_placeholder.jpg"
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
            onChange={(e) =>
              setImage(
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : null
              )
            }
          />
        </label>
        <FormField label={<label htmlFor="title">Title</label>}>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </FormField>

        <FormField label={<label htmlFor="content">Content</label>}>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something about this..."
            rows={3}
          />
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
          />{" "}
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
          <Button type="submit">Create</Button>
          <Button type="submit" variant="outline">
            Cancel
          </Button>
        </HStack>
      </FormStyles>
    </form>
  );
};

export default AddPostForm;
