import { Link } from "react-router-dom";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Avatar from "./ui/Avatar";
import { useProfileData, useSetProfileData } from "@/contexts/ProfileContext";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

const TopProfilesAside = () => {
  // get the profiles, handlers + current user from contexts:
  const { results: profiles } = useProfileData();
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();

  return (
    <Box ml={5} mt={16}>
      <VStack gap={6} align="start">
        <Heading ml={7} as="h2" size="lg">
          Top profiles
        </Heading>
        {profiles.length > 0 && (
          <VStack gap={6} align="stretch">
            {profiles
              .filter((profile) => profile.id !== currentUser?.profile_id) // don't include current user
              .map((profile) => {
                const { id, owner, image } = profile;
                const isFollowing = !!profile.following_id; // true if already following
                const isSelf = currentUser?.profile_id === profile.id; // true if this is the current user's profile
                return (
                  <HStack
                    key={id}
                    gap={2}
                    align="center"
                    justify="space-between"
                  >
                    {" "}
                    <Box width="100px" textAlign="center">
                      <Link to={`/profiles/${id}`}>
                        <VStack gap={1}>
                          <Avatar src={image || undefined} />
                          <Text>{owner}</Text>
                        </VStack>
                      </Link>
                    </Box>
                    {!isSelf && (
                      <Box
                        as="span"
                        onClick={() =>
                          isFollowing
                            ? handleUnfollow(profile)
                            : handleFollow(profile)
                        }
                        width="18px"
                        height="18px"
                        borderRadius="50%"
                        bg={isFollowing ? "secondary" : "transparent"} // fill if following
                        border={isFollowing ? "none" : "1px solid"} // outline if not following
                        borderColor={isFollowing ? undefined : "text"} // theme text color
                        cursor="pointer"
                        mb={4}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="20px"
                      >
                        {!isFollowing && "+"}
                      </Box>
                    )}
                  </HStack>
                );
              })}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
export default TopProfilesAside;
