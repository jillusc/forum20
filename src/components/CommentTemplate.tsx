import { Link } from "react-router-dom";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui";
import type { Comment } from "@/types";

interface Props {
  comment: Comment;
}

const CommentTemplate = ({ comment }: Props) => {
  // destructure fields we need from comment props:
  const { owner, profile_id, profile_image, content, updated_at } = comment;

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
      <HStack justify="space-between" align="top">
        <Link to={`/profiles/${profile_id}`}>
          <VStack align="center" gap={1}>
            <Avatar src={profile_image || undefined} />
            <Text>{owner}</Text>
          </VStack>
        </Link>
        <Text>{new Date(updated_at).toLocaleDateString("en-GB")}</Text>
      </HStack>
      <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="2xl">
        <Text>{content}</Text>
      </Box>
    </Box>
  );
};

export default CommentTemplate;
