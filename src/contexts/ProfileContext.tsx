import { useEffect, useState, type ReactNode } from "react";
import { axiosRes } from "@/api/axiosDefaults";
import { useFetchProfiles } from "@/hooks/useFetchProfiles";
import { useCurrentUser } from "./useCurrentUser";
import { followHelper, unfollowHelper } from "@/utils/utils";
import type { Profile } from "@/types";
import { ProfileContext } from "./ProfileContextObject";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { topProfiles } = useFetchProfiles(); // fetch profiles
  const [profileData, setProfileData] = useState<Profile[]>([]);
  const currentUser = useCurrentUser();

  // populate context when topProfiles changes:
  useEffect(() => {
    if (topProfiles.length) setProfileData(topProfiles);
  }, [topProfiles]);

  const handleFollow = async (clickedProfile: Profile) => {
    // don't allow following oneself:
    if (currentUser?.profile_id === clickedProfile.id) return;
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
      setProfileData((prev) =>
        prev.map((profile) => followHelper(profile, clickedProfile, data.id))
      );
    } catch (err) {
      console.error("Error following profile:", err);
    }
  };

  const handleUnfollow = async (clickedProfile: Profile) => {
    if (!clickedProfile.following_id) return;
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prev) =>
        prev.map((profile) => unfollowHelper(profile, clickedProfile))
      );
    } catch (err) {
      console.error("Error unfollowing profile:", err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData: { results: profileData },
        setProfileData,
        handleFollow,
        handleUnfollow,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
