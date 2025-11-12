import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContextObject";

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  return context.currentUser;
}

export function useSetCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error(
      "useSetCurrentUser must be used within a CurrentUserProvider"
    );
  return context.setCurrentUser;
}

export function useCurrentUserLoading() {
  const context = useContext(CurrentUserContext);
  if (!context)
    throw new Error(
      "useCurrentUserLoading must be used within a CurrentUserProvider"
    );
  return context.CULoading;
}
