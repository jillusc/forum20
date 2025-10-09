import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import PostsPage from "@/pages/PostsPage";
import type { Profile } from "@/types";
import { ProfileTemplate, TopProfilesBase } from "@/components";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <Text>Loading…</Text>;
  if (error) return <Text>{error}</Text>;
  if (!profile) return <Text>Profile not found</Text>;

  return (
    <>
      <Box display={{ base: "block", lg: "none" }}>
        <TopProfilesBase />
      </Box>
      <ProfileTemplate profile={profile} />
      <PostsPage
        filter={`owner__profile=${id}&`}
        message={`${profile.owner} hasn't posted anything yet.`}
        showExtras={false} // hide search bar and TopProfiles
      />
    </>
  );
};

export default ProfilePage;
