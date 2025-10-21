import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  FaHeart,
  FaCommentDots,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { Avatar, MoreDropdown } from "@/components/ui";
import type { Post } from "@/types";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useSetPosts } from "@/contexts/PostsContext";
import { axiosRes } from "@/api/axiosDefaults";
import { postMenuItems } from "@/data/menuItems";

interface Props {
  post: Post;
  setPost?: React.Dispatch<React.SetStateAction<Post | null>>;
  postIsEditable?: boolean;
  onEdit?: () => void; // optional because only 1 of the 2 parents needs them
  onDelete?: () => void; // these actions are only for a single Post, so are not relevant in PostsPage!
  onCommentIconClick?: () => void;
}

const PostTemplate = ({
  post,
  setPost,
  postIsEditable = false,
  onEdit,
  onDelete,
  onCommentIconClick,
}: Props) => {
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
    bookmark_id,
  } = post;
  const is_owner = currentUser?.username === owner;
  const isBookmarked = !!bookmark_id; // "if a bookmark_id exists, this means the current user has bookmarked this post, so return true"
  const navigate = useNavigate();

  const handleLikeToggle = async () => {
    try {
      const { status, data } = await axiosRes.post("/likes/", { post: id });
      // 1. update the global posts list (i.e. PostsPage):
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== id) return post;
          // backend returns 204 if the like was removed, or data if created:
          if (status === 204 || data.detail === "unliked") {
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

  const handleBookmarkToggle = async () => {
    try {
      const { status, data } = await axiosRes.post("/bookmarks/", { post: id });
      // 1. update the global posts list (i.e. PostsPage):
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== id) return post;
          // backend returns 204 if the bookmark was removed, or data if created:
          if (status === 204 || data.detail === "bookmark removed") {
            return { ...post, bookmark_id: null };
          } else {
            return { ...post, bookmark_id: data.id };
          }
        })
      );
      // 2. update the local post if setPost is passed (i.e. from PostPage)
      setPost?.((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              bookmark_id:
                status === 204 || data.detail === "bookmark removed"
                  ? null
                  : data.id,
            }
          : prev
      );
    } catch (err) {
      console.log(err);
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
          <Text>{new Date(updated_at).toLocaleDateString("en-GB")}</Text>
          {is_owner && postIsEditable && (
            <Box position="relative">
              <MoreDropdown
                menuItems={
                  onEdit && onDelete ? postMenuItems(onEdit, onDelete) : []
                }
                width="130px"
              />{" "}
            </Box>
          )}
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
          cursor={postIsEditable ? "default" : "pointer"}
        >
          {postIsEditable ? (
            <Image
              src={image}
              alt={`[IMAGE: ${title}]`}
              maxH="100%"
              width="100%"
              objectFit="contain"
            />
          ) : (
            <Link to={`/posts/${id}`}>
              <Image
                src={image}
                alt={`[IMAGE: ${title}]`}
                maxH="100%" // makes sure image never exceeds Box height
                width="100%" // responsive width
                objectFit="contain" // maintains aspect ratio
              />
            </Link>
          )}
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
            <Box
              as="span"
              cursor="pointer"
              onClick={() => {
                if (onCommentIconClick) {
                  onCommentIconClick(); // used in PostPage
                } else {
                  navigate(`/posts/${id}`); // used in PostsPage
                }
              }}
            >
              <FaCommentDots />
            </Box>
            <Text>{comments_count}</Text>
          </HStack>
        </HStack>
        <Spacer />
        {is_owner ? (
          <Box color="text">
            <FaRegBookmark />
          </Box>
        ) : (
          <Box as="span" cursor="pointer" onClick={handleBookmarkToggle}>
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default PostTemplate;

// line 27: add this because the MoreDropdown shall not be visible on every view
// line 59: bookmark_id in the post props is only set for the currently logged-in user,
// so checking !!bookmark_id lets the frontend know whether that user has already bookmarked this post
