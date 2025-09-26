import PostsPage from "@/components/PostsPage";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

const FeedPage = () => {
  const currentUser = useCurrentUser();
  const profileId = currentUser?.pk || "";

  return (
    <PostsPage
      filter={`owner__followed__owner__profile=${profileId}&`}
      message="No posts found. Try following users or checking back later."
    />
  );
};

export default FeedPage;
