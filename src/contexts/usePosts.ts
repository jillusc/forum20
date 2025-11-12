import { useContext } from "react";
import { PostsContext } from "./PostsContextObject";

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context.posts;
};

export const useSetPosts = () => {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error("useSetPosts must be used within a PostsProvider");
  return context.setPosts;
};

export const usePostsLoading = () => {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error("usePostsLoading must be used within a PostsProvider");
  return context.loading;
};

export const useSetPostsLoading = () => {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error("useSetPostsLoading must be used within a PostsProvider");
  return context.setLoading;
};
