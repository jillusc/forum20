import { useContext } from "react";
import { ProfileContext } from "./ProfileContextObject";

export const useProfileData = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfileData must be used within a ProfileProvider");
  return context.profileData;
};

export const useSetProfileData = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useSetProfileData must be used within a ProfileProvider");
  return {
    setProfileData: context.setProfileData,
    handleFollow: context.handleFollow,
    handleUnfollow: context.handleUnfollow,
  };
};
