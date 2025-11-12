import { createContext } from "react";
import type { Profile } from "@/types";

export type ProfileContextType = {
  profileData: { results: Profile[] };
  setProfileData: React.Dispatch<React.SetStateAction<Profile[]>>;
  handleFollow: (clickedProfile: Profile) => Promise<void>;
  handleUnfollow: (clickedProfile: Profile) => Promise<void>;
};

export const ProfileContext = createContext<ProfileContextType | null>(null);
