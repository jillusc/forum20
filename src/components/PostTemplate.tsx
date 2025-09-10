import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Image,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { FaHeart, FaCommentDots, FaBookmark } from "react-icons/fa";
import type { Post } from "../types";

interface Props {
  post: Post;
}

const PostTemplate = ({ post }: Props) => {
  return (
    <Box
      maxWidth="768px" // cap width at tablet size
      width="100%" // full width otherwise
      mx="auto" // centre horizontally
      my={2}
      p={4}
      borderWidth="2px"
      borderColor="primary"
      borderRadius="2xl"
    >
      <Flex justify="space-between" align="start">
        <Link>
          {/* Avatar: */}
          <Image
            borderRadius="full"
            boxSize="40px"
            src={post.profile_image || undefined}
            alt={post.owner}
          />
          <Text>{post.owner}</Text>
        </Link>
        <HStack gap={3}>
          <Text>{new Date(post.updated_at).toLocaleDateString("en-GB")}</Text>
          {/* {post.is_owner && postPage && <MoreDropdown />} */}
        </HStack>
      </Flex>
      <VStack gap={3} mb={5}>
        {post.title && (
          <Heading textAlign="center" mb={3}>
            {post.title}
          </Heading>
        )}

        <Box display="flex" width="80%" mx="auto" justifyContent="center">
          <Link>
            <Image
              src={post.image}
              alt={`[IMAGE: ${post.title}]`}
              maxH="100%" // makes sure image never exceeds Box height
              width="100%" // responsive width
              objectFit="contain" // maintains aspect ratio
            />
          </Link>
        </Box>

        <VStack gap={3}>
          {(post.artist_name || post.year_of_artwork) && (
            <Text fontWeight="500" textAlign="center">
              {post.artist_name}
              {post.artist_name && post.year_of_artwork ? ", '" : ""}
              {post.year_of_artwork}
            </Text>
          )}
          {post.content && <Text>{post.content}</Text>}
        </VStack>
      </VStack>
      <HStack gap={4} align="center">
        <HStack gap={2}>
          <FaHeart />
          <Text>{post.likes_count}</Text>
        </HStack>
        <HStack gap={2}>
          <FaCommentDots />
          <Text>{post.comments_count}</Text>
        </HStack>
        <Spacer />
        <FaBookmark />
      </HStack>
    </Box>
  );
};

export default PostTemplate;

// line 37: NOTE: an Image cannot accept a null value (see interface) for the src prop
// ...so we must convert any null value to undefined before passing it!
