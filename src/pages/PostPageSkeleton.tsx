import { Box } from "@chakra-ui/react";
import { PostSkeleton } from "@/components/ui";

const PostPageSkeleton = () => {
  return (
    <Box mt={6}>
      <PostSkeleton />
    </Box>
  );
};

export default PostPageSkeleton;
