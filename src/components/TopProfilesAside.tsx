import { Link } from "react-router-dom";
import { useFetchProfiles } from "@/hooks/useFetchProfiles";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Avatar from "./ui/Avatar";

const TopProfilesAside = () => {
  const { topProfiles, error } = useFetchProfiles();

  return (
    <Box ml={5} mt={16}>
      <VStack gap={6} align="start">
        <Heading ml={7} as="h2" size="lg">
          Top profiles
        </Heading>
        {topProfiles.length > 0 && (
          <VStack gap={6} align="stretch">
            {topProfiles.map((profile) => {
              const { pk, username, profile_image } = profile;
              return (
                <HStack key={pk} gap={2} align="center" justify="space-between">
                  <Box width="100px" textAlign="center">
                    <Link to={`/profiles/${pk}`}>
                      <VStack gap={1}>
                        <Avatar src={profile_image || undefined} />
                        <Text>{username}</Text>
                      </VStack>
                    </Link>
                  </Box>
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
