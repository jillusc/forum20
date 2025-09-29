import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaHeart, FaCommentDots, FaBookmark } from "react-icons/fa";
import { Avatar } from "@/components/ui";
import type { Post } from "../types";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useSetPosts } from "@/contexts/PostsContext";
import { axiosRes } from "@/api/axiosDefaults";
import { useState } from "react";

interface Props {
  post: Post;
  setPost?: React.Dispatch<React.SetStateAction<Post | null>>;
}

const PostTemplate = ({ post, setPost }: Props) => {
  const [error, setError] = useState("");
  const currentUser = useCurrentUser(); // define current user
  const setPosts = useSetPosts();
  // destructure fields we need from post props:
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    artist_name,
    year_of_artwork,
  } = post;
  const is_owner = currentUser?.username === owner;

  const handleLikeToggle = async () => {
    try {
      const { status, data } = await axiosRes.post("/likes/", { post: id });
      // 1. update the global posts list (i.e. PostsPage):
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== id) return post;
          // Backend returns 204 if the like was removed, or data if created.
          if (status === 204 || data.detail === "like removed") {
            return { ...post, likes_count: likes_count - 1, like_id: null };
          } else {
            return { ...post, likes_count: likes_count + 1, like_id: data.id };
          }
        })
      );
      // 2. update the local post if setPost is passed (i.e. from PostPage)
      setPost?.((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              likes_count:
                status === 204 || data.detail === "unliked"
                  ? prev.likes_count - 1
                  : prev.likes_count + 1,
              like_id:
                status === 204 || data.detail === "unliked" ? null : data.id,
            }
          : prev
      );
    } catch (err: any) {
      if (err.response?.data) {
        setError(err.response.data); // check for + store backend error data
      } else {
        console.error(err); // log unexpected errors
      }
    }
  };

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
        <Link to={`/profiles/${profile_id}`}>
          <VStack align="center" gap={1}>
            <Avatar src={profile_image || undefined} />
            <Text>{owner}</Text>
          </VStack>
        </Link>
        <HStack gap={3}>
          <Text>{new Date(post.updated_at).toLocaleDateString("en-GB")}</Text>
          {/* {post.is_owner && postPage && <MoreDropdown />} */}
        </HStack>
      </Flex>
      <VStack gap={3} mb={5}>
        {title && (
          <Heading textAlign="center" mb={3}>
            {title}
          </Heading>
        )}

        <Box
          display="flex"
          width="80%"
          mx="auto"
          justifyContent="center"
          maxH={{ base: "50vh", md: "60vh" }}
        >
          <Link to={`/posts/${id}`}>
            <Image
              src={image}
              alt={`[IMAGE: ${title}]`}
              maxH="100%" // makes sure image never exceeds Box height
              width="100%" // responsive width
              objectFit="contain" // maintains aspect ratio
            ></Image>
          </Link>
        </Box>

        <VStack gap={3}>
          {(artist_name || year_of_artwork) && (
            <Text fontWeight="500" textAlign="center">
              {artist_name}
              {artist_name && year_of_artwork ? ", '" : ""}
              {year_of_artwork}
            </Text>
          )}
          {content && <Text mb={4}>{content}</Text>}
        </VStack>
      </VStack>
      <HStack>
        <HStack gap={4} align="center">
          <HStack gap={2}>
            {is_owner ? (
              <Box color="text">
                <FaHeart />
              </Box>
            ) : currentUser ? (
              <Box
                as="span"
                cursor="pointer"
                onClick={handleLikeToggle}
                color={like_id ? "secondary" : "text"}
              >
                <FaHeart />
              </Box>
            ) : (
              <Box color="text">
                <FaHeart />
              </Box>
            )}
            <Text>{likes_count}</Text>
          </HStack>
          <HStack gap={2}>
            <Link to={`/posts/${id}`}>
              <FaCommentDots />
            </Link>
            <Text>{comments_count}</Text>
          </HStack>
        </HStack>
        <Spacer />
        <FaBookmark />
      </HStack>
    </Box>
  );
};

export default PostTemplate;

// line 43: NOTE: an Image cannot accept a null value (see interface) for the src prop
// ...so we must convert any null value to undefined before passing it!
