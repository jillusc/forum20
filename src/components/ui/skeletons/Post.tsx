import {
  Box,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  Center,
  Spinner,
  HStack,
} from "@chakra-ui/react";

// N.B. Y margins are controlled by each page skeleton!
export const PostSkeleton = () => {
  return (
    <Box width="92%" mx="auto" p={4} borderWidth="1px" borderRadius="2xl">
      {/* avatar + name + date */}
      <Flex justify="space-between" align="start">
        <VStack align="center" gap={3}>
          <SkeletonCircle size="45px" />
          <Skeleton height="12px" width="48px" />
        </VStack>
        <HStack>
          <Skeleton height="20px" width="88px" />
        </HStack>
      </Flex>

      <Box position="relative">
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      </Box>
    </Box>
  );
};

// N.B. Y margins are controlled by each page skeleton!
export const PostsSkeleton = ({ count = 2 }) => (
  <Flex gap={4} flexWrap="noWrap" justify="center">
    {Array.from({ length: count }).map((_, i) => (
      <PostSkeleton key={i} />
    ))}
  </Flex>
);
