import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const AddPostForm = () => {
  return (
    <Box
      maxW="700px"
      mx="auto"
      marginTop={10}
      padding={6}
      borderColor="primary"
      borderWidth="2px"
      borderRadius="2xl"
    >
      <Heading mb={6} textAlign="center">
        Create Post
      </Heading>

      <form>
        <VStack gap={4}>
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
            <Input id="image-upload" type="file" accept="image/*" />
          </label>

          <Box>
            <label htmlFor="title">Title</label>
            <Input id="title" type="text" placeholder="Enter post title" />
          </Box>

          <Box>
            <label htmlFor="content">Content</label>
            <Textarea
              id="content"
              placeholder="Write something about this..."
              rows={3}
            />
          </Box>

          <Box>
            <label htmlFor="artist">
              Artist{" "}
              <Text as="span" fontSize="sm">
                (opt.){" "}
              </Text>
            </label>
            <Input id="artist" type="text" placeholder="Enter artist name" />
          </Box>

          <Box display="flex" alignItems="center" gap={3}>
            <label htmlFor="year">
              Year{" "}
              <Text as="span" fontSize="sm">
                (opt.){" "}
              </Text>
            </label>
            <Input id="year" type="number" placeholder="e.g. 89" width="85px" />
          </Box>

          <Box>
            <label
              htmlFor="is-private"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              Make this post visible only to followers
              <input
                id="is-private"
                type="checkbox"
                checked={false}
                style={{ transform: "scale(1.2)" }}
              />
            </label>
          </Box>

          <HStack gap={4}>
            <Button type="submit">Create</Button>
            <Button variant="outline">Cancel</Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default AddPostForm;
