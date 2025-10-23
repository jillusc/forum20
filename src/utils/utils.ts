import { axiosRes } from "@/api/axiosDefaults";
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

// generic function fetches the next page of a paginated resource:
export const fetchMoreData = async <T extends { id: number }>(
  resource: { results: T[]; next: string | null }, // the current resource state with results and next page URL
  setResource: React.Dispatch<React.SetStateAction<typeof resource>> // the state setter function to update the resource
) => {
  if (!resource.next) return; // if there are no more pages, stop here and do nothing.
  try {
    const { data } = await axiosRes.get(resource.next); // fetch the next page
    // update the state with the new data:
    setResource((prev) => ({
      ...prev, // keep the existing data, then:
      // i) update the next URL for the next page:
      next: data.next,
      // ii) start looping through each item in the new results array (cur)
      // with acc as the accumulator initialised to previous results:
      results: data.results.reduce((acc: T[], cur: T) => {
        // check if the current item (cur) already exists in acc by comparing IDs:
        return acc.some((item) => item.id === cur.id)
          ? acc // if it already exists, skip it
          : [...acc, cur]; // otherwise, add it to the accumulated array
        // and use the previous results as the starting array for the reduce,
        // so we append only new items:
      }, prev.results),
    }));
  } catch (err) {
    console.error(err);
  }
};
