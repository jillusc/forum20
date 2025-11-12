import { createContext } from "react";
import type { Post } from "@/types";

export type PostsContextType = {
  posts: { results: Post[]; next: string | null };
  setPosts: React.Dispatch<
    React.SetStateAction<{ results: Post[]; next: string | null }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsContext = createContext<PostsContextType | null>(null);
