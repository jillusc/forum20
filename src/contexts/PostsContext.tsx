import { createContext, useContext, useState, type ReactNode } from "react";
import type { Post } from "@/types";

// type for the context value: posts object (with results array and next page URL + setter)
type PostsContextType = {
  posts: { results: Post[]; next: string | null };
  setPosts: React.Dispatch<
    React.SetStateAction<{ results: Post[]; next: string | null }>
  >;
};

// context to hold the posts + setter (uses type as above):
export const PostsContext = createContext<PostsContextType | null>(null);

// Provider component creates/defines state:
export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<{ results: Post[]; next: string | null }>({
    results: [],
    next: "/api/posts/?page=1", // initial page URL
  });

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

// hook to get the value of state in line 15:
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("usePosts must be used within a PostsProvider");
  return context.posts;
};

// hook to get the state setter in line 15:
export const useSetPosts = () => {
  const context = useContext(PostsContext);
  if (!context)
    throw new Error("useSetPosts must be used within a PostsProvider");
  return context.setPosts;
};
