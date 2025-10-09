import { Link } from "react-router-dom";
import { useFetchProfiles } from "@/hooks/useFetchProfiles";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Avatar from "./ui/Avatar";

const TopProfilesBase = () => {
  const { topProfiles, error } = useFetchProfiles();

  return (
    <Box maxWidth="578px" mx="auto" mt={3} mb={5}>
      <VStack gap={5} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Top profiles
        </Heading>
        {topProfiles.length > 0 && (
          <HStack gap={8} justify="center">
            {topProfiles.slice(0, 4).map((profile) => {
              const { id, owner, image } = profile;
              return (
                <Link key={id} to={`/profiles/${id}`}>
                  <VStack>
                    <Avatar src={image || undefined} height={50} />
                    <Text>{owner}</Text>
                  </VStack>
                </Link>
              );
            })}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default TopProfilesBase;
