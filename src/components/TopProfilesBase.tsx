import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import type { User } from "@/types";
import Avatar from "./ui/Avatar";

const TopProfilesBase = () => {
  const [popularProfiles, setPopularProfiles] = useState<User[]>([]); // hold the array of user profiles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchTopProfiles = async () => {
      try {
        const { data } = await axiosRes.get(
          "/profiles/?ordering=-followers_count"
        );
        setPopularProfiles(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProfiles();
  }, [currentUser]);

  return (
    <Box maxWidth="578px" mx="auto" mt={3} mb={5}>
      <VStack gap={5} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Top profiles
        </Heading>
        {popularProfiles.length ? (
          <HStack gap={8} justify="center">
            {popularProfiles.slice(0, 4).map((profile) => {
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
        ) : (
          <Text>No profiles found</Text>
        )}
      </VStack>
    </Box>
  );
};

export default TopProfilesBase;
