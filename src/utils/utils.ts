import type { Profile } from "@/types";

// updates a profile after following:
export const followHelper = (
  profile: Profile,
  clickedProfile: Profile,
  following_id: number
): Profile => {
  if (profile.id === clickedProfile.id) {
    // "if the id of the current profile in the array is the same as the one just clicked, do the following:"
    return {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    };
  } else if (profile.is_owner) {
    // "or if current user's profile (is true):"
    return {
      ...profile,
      following_count: profile.following_count + 1,
    };
  }
  return profile; // in all other cases, no changes.
};

// updates a profile after unfollowing:
export const unfollowHelper = (
  profile: Profile,
  clickedProfile: Profile
): Profile => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    };
  } else if (profile.is_owner) {
    return {
      ...profile,
      following_count: profile.following_count - 1,
    };
  }
  return profile;
};
