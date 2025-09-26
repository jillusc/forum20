import { useParams } from "react-router-dom";
import PostsPage from "@/components/PostsPage";

const ProfilePage = () => {
  const { profileId } = useParams<{ profileId: string }>();

  return (
    <PostsPage
      filter={`owner__profile=${profileId}&`}
      message="This user hasn’t posted anything yet."
    />
  );
};

export default ProfilePage;
