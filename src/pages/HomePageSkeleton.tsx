import { Box, VStack } from "@chakra-ui/react";
import { PostsSkeleton, TopProfilesBaseSkeleton } from "@/components/ui";

const HomePageSkeletons = () => {
  return (
    <VStack mt="28px" gap="92px" align="stretch">
      <Box display={{ base: "block", lg: "none" }}>
        <TopProfilesBaseSkeleton />
      </Box>
      <PostsSkeleton />
    </VStack>
  );
};

export default HomePageSkeletons;
