import { Link } from "react-router-dom";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useCurrentUser } from "@/contexts/useCurrentUser";
import { Avatar, MoreDropdown } from "@/components/ui";
import { commentMenuItems } from "@/data/menuItems";
import type { Comment } from "@/types";

interface Props {
  comment: Comment;
  handleEdit: () => void; // just calls parent to trigger editing
  handleDelete: () => void; // calls parent to delete
}
const CommentTemplate = ({ comment, handleEdit, handleDelete }: Props) => {
  // destructure fields we need from Comment props:
  const { owner, profile_id, profile_image, content, updated_at } = comment;
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === owner;

  if (!comment) return null;

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
      <HStack justify="space-between" align="start">
        <Link to={`/profiles/${profile_id}`}>
          <VStack align="center" gap={1}>
            <Avatar src={profile_image || undefined} />
            <Text>{owner}</Text>
          </VStack>
        </Link>
        <HStack gap={3}>
          {updated_at && (
            <Text>{new Date(updated_at).toLocaleDateString("en-GB")}</Text>
          )}
          {isOwner && (
            <Box position="relative">
              <MoreDropdown
                menuItems={commentMenuItems(
                  handleEdit, // now it already has the id from parent
                  handleDelete,
                )}
                width="130px"
              />
            </Box>
          )}
        </HStack>
      </HStack>
      <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="2xl">
        <Text>{content || ""}</Text>
      </Box>
    </Box>
  );
};

export default CommentTemplate;
