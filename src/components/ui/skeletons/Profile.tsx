import {
  Box,
  Center,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Spinner,
  VStack,
} from "@chakra-ui/react";

// N.B. Y margins are controlled by each page skeleton!
export const ProfileSkeleton = () => (
  <Box
    width="100%"
    mx="auto"
    p={4}
    borderWidth="1px"
    borderRadius="2xl"
    position="relative"
  >
    <VStack gap={5} mb="36px">
      {/* Avatar */}
      <SkeletonCircle size="100px" />
      {/* Username */}
      <Skeleton height="28px" width="100px" />
      {/* Member since */}
      <Skeleton height="20px" width="200px" />
      {/* Stats */}
      <HStack gap={14} justify="center">
        {["posts", "followers", "following"].map((label) => (
          <VStack key={label} gap={3} align="center">
            <Skeleton height="12px" width="60px" />
            <SkeletonCircle size="16px" />
          </VStack>
        ))}
      </HStack>
      <Box position="relative">
        <Center height="100%">
          <Spinner size="lg" />
        </Center>
      </Box>
    </VStack>
  </Box>
);

// N.B. Y margins are controlled by each page skeleton!
export const TopProfilesBaseSkeleton = ({ count = 4 }) => (
  <VStack gap={5} align="stretch" mr={4}>
    <Flex justify="center" gap={8}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCircle key={i} size="50px" />
      ))}
    </Flex>
  </VStack>
);

// N.B. Y margins are controlled by each page skeleton!
export const TopProfilesAsideSkeleton = ({ count = 10 }) => (
  <Box ml={7}>
    <VStack gap={6}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCircle key={i} size="45px" />
      ))}
    </VStack>
  </Box>
);
