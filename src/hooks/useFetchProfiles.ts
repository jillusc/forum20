import { useEffect, useState } from "react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { axiosRes } from "@/api/axiosDefaults";
import type { Profile } from "@/types";

export function useFetchProfiles() {
  const [topProfiles, setTopProfiles] = useState<Profile[]>([]); // hold the array of user profiles
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
      } catch (err) {
        setError("");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProfiles();
  }, [currentUser]);

  return { topProfiles, loading, error };
}
