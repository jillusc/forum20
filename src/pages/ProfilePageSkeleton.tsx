import { Box, VStack } from "@chakra-ui/react";
import {
  PostsSkeleton,
  ProfileSkeleton,
  TopProfilesBaseSkeleton,
} from "@/components/ui";

const ProfilePageSkeletons = () => {
  return (
    <VStack mt="110px" gap="106px" align="stretch">
      <Box display={{ base: "block", lg: "none" }}>
        <TopProfilesBaseSkeleton />
      </Box>
      <VStack gap="50px" align="stretch">
        <ProfileSkeleton />
        <PostsSkeleton />
      </VStack>
    </VStack>
  );
};

export default ProfilePageSkeletons;
