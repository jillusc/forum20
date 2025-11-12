import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { axiosRes } from "@/api/axiosDefaults";
import PostsPage from "@/pages/PostsPage";
import type { Profile } from "@/types";
import { useProfileData, useSetProfileData } from "@/contexts";
import { ProfileTemplate, TopProfilesBase } from "@/components";
import { SearchBar } from "@/components/ui";
import ProfilePageSkeletons from "./ProfilePageSkeleton";
import axios from "axios";
import { UIMessage } from "@/components/ui";

const ProfilePage = () => {
  const { id } = useParams();
  const { results: profiles } = useProfileData();
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // store what the user typed in the search bar

  const currentProfile = profiles.find((p) => p.id === profile?.id);
  const isFollowing = !!currentProfile?.following_id;

  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (err: unknown) {
        // TS type guard - safely confirms this is an Axios error:
        if (axios.isAxiosError(err)) {
          const data = err.response?.data; // safely access the backend’s response (if any)
          if (!data) {
            console.error("Network or connection error:", err);
            setError("Network error - please try again.");
            return;
          }
          console.error("Backend error:", data); // log the raw data for debugging
          setError(
            typeof data === "string"
              ? data
              : data.detail ?? "Couldn't load profile. Please try again."
          );
        } else {
          console.error("Unexpected error:", err); // log all other errors
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, searchTerm]);

  // Provide fallback UI while data is loading, handle fetch errors,
  // and prevent crashes if required data is missing:
  if (loading) return <ProfilePageSkeletons />;
  if (error) return <UIMessage color="red">{error}</UIMessage>;
  if (!loading && !profile) return <UIMessage>Post not found</UIMessage>;
  if (!profile) return null; // also needed for TS

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <Box display={{ base: "block", lg: "none" }}>
        <TopProfilesBase />
      </Box>
      <ProfileTemplate
        profile={profile}
        isFollowing={isFollowing}
        handleFollow={() => currentProfile && handleFollow(currentProfile)}
        handleUnfollow={() => currentProfile && handleUnfollow(currentProfile)}
      />
      <PostsPage filter={`owner__profile=${id}&`} searchTerm={searchTerm} />
    </>
  );
};

export default ProfilePage;
