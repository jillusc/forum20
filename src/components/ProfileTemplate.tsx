import { useNavigate } from "react-router-dom";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Avatar, Button, MoreDropdown } from "./ui";
import type { Profile } from "@/types";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { profileMenuItems } from "@/data/menuItems";

interface Props {
  profile: Profile;
}

const ProfileTemplate = ({ profile }: Props) => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const {
    owner,
    created_at,
    image,
    posts_count,
    followers_count,
    following_count,
    content,
    following_id,
  } = profile;
  const is_owner = currentUser?.username === owner;
  const stats = [
    { label: "posts", value: posts_count },
    { label: "followers", value: followers_count },
    { label: "following", value: following_count },
  ];

  return (
    <Box
      maxWidth="768px"
      width="100%"
      mx="auto"
      my={10}
      p={4}
      borderWidth="2px"
      borderColor="primary"
      borderRadius="2xl"
      position="relative"
    >
      {is_owner && (
        <Box position="absolute" top={4} right={4}>
          <MoreDropdown
            menuItems={profileMenuItems(navigate, profile.id.toString())}
            width="210px"
          />{" "}
        </Box>
      )}
      <VStack gap={3} mb="5">
        <Avatar src={image || undefined} height={100} />
        <Heading as="h1" size="3xl">
          {owner}
        </Heading>
        <Text fontWeight="bold">
          member since{" "}
          {new Date(created_at).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </Text>

        <HStack gap={8} justify="center">
          {stats.map(({ label, value }) => (
            <VStack key={label} gap={0} align="center">
              <Text>{label}</Text>
              <Text fontWeight="bold">{value}</Text>
            </VStack>
          ))}
        </HStack>

        {content && (
          <Box width="80%">
            <VStack align="start" gap={1}>
              <Heading as="h2" size="lg">
                {owner}'s bio
              </Heading>
              <Text>{content}</Text>
            </VStack>
          </Box>
        )}

        {!is_owner && (
          <Box width="100%" display="flex" justifyContent="center">
            <Button>{following_id ? "Unfollow" : "Follow"}</Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ProfileTemplate;
