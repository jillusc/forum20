import { useState, type ReactNode } from "react";
import type { Post } from "@/types";
import { PostsContext } from "./PostsContextObject";

// type for the context value: posts object (with results array and next page URL + setter)
type PostsContextType = {
  posts: { results: Post[]; next: string | null };
  setPosts: React.Dispatch<
    React.SetStateAction<{ results: Post[]; next: string | null }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// Provider component creates/defines state:
export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<{ results: Post[]; next: string | null }>({
    results: [],
    next: "/api/posts/?page=1", // initial page URL
  });
  const [loading, setLoading] = useState(true);

  return (
    <PostsContext.Provider value={{ posts, setPosts, loading, setLoading }}>
      {children}
    </PostsContext.Provider>
  );
};
