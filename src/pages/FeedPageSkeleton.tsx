import { Box, VStack } from "@chakra-ui/react";
import { PostsSkeleton, TopProfilesBaseSkeleton } from "@/components/ui";

const FeedPageSkeletons = () => {
  return (
    <VStack mt="8px" gap="92px" align="stretch">
      <Box mt="52px" display={{ base: "block", lg: "none" }}>
        <TopProfilesBaseSkeleton />
      </Box>
      <PostsSkeleton />
    </VStack>
  );
};

export default FeedPageSkeletons;
