import { Link } from "react-router-dom";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Avatar from "./ui/Avatar";
import { useCurrentUser, useProfileData, useSetProfileData } from "@/contexts";

const TopProfilesBase = () => {
  // get the profiles, handlers + current user from contexts:
  const { results: profiles } = useProfileData();
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();

  return (
    <Box maxWidth="578px" mx="auto" mt={3} mb={5}>
      <VStack gap={5} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Top profiles
        </Heading>
        {profiles.length > 0 && (
          <HStack gap={8} justify="center">
            {profiles
              .filter((profile) => profile.id !== currentUser?.profile_id) // don't include current user
              .slice(0, 4)
              .map((profile) => {
                const { id, owner, image } = profile;
                const isFollowing = !!profile.following_id; // true if already following
                const isSelf = currentUser?.profile_id === profile.id; // true if this is the current user's profile
                return (
                  <VStack key={id} gap={1} align="center">
                    <Link to={`/profiles/${id}`}>
                      <VStack gap={1}>
                        <Avatar src={image || undefined} height={50} />
                        <Text>{owner}</Text>
                      </VStack>
                    </Link>
                    {!isSelf && (
                      <Box
                        as="span"
                        onClick={() =>
                          isFollowing
                            ? handleUnfollow(profile)
                            : handleFollow(profile)
                        }
                        width="16px"
                        height="16px"
                        borderRadius="50%"
                        bg={isFollowing ? "secondary" : "transparent"} // fill if following
                        border={isFollowing ? "none" : "1px solid"} // outline if not following
                        borderColor={isFollowing ? undefined : "text"}
                        cursor="pointer"
                        mb={4}
                      />
                    )}
                  </VStack>
                );
              })}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default TopProfilesBase;
