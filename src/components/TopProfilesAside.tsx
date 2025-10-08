import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import type { User } from "@/types";
import Avatar from "./ui/Avatar";

const TopProfiles = () => {
  const [topProfiles, setTopProfiles] = useState<User[]>([]); // hold the array of user profiles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchTopProfiles = async () => {
      try {
        const { data } = await axiosRes.get(
          "/profiles/?ordering=-followers_count"
        );
        setTopProfiles(data.results.slice(0, 10));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProfiles();
  }, [currentUser]);

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

export default TopProfiles;
