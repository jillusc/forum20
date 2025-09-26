import PostsPage from "@/components/PostsPage";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

const ActivityPage = () => {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.pk || "";

  return (
    <PostsPage
      filter={`likes__owner__profile=${profileId}&ordering=-likes__created_at&`}
      message="No activity found. Try liking, bookmarking or commenting on some posts!"
    />
  );
};

export default ActivityPage;
