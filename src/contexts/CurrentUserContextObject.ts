import { createContext } from "react";
import type { User } from "@/types";

export type CurrentUserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  CULoading: boolean;
};

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null,
);
