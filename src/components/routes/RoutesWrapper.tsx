import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useCurrentUser, useCurrentUserLoading } from "@/contexts";

interface Props {
  children: ReactNode;
  authOnly?: boolean; // page requires logged-in user
  guestOnly?: boolean; // page should only be seen by logged-out users
}

export function RouteWrapper({
  children,
  authOnly = false,
  guestOnly = false,
}: Props) {
  const currentUser = useCurrentUser();
  const CULoading = useCurrentUserLoading(); // grab the currentUser loading

  const navigate = useNavigate();

  useEffect(() => {
    if (CULoading) return; // don’t redirect while user data is still loading
    if (authOnly && !currentUser) {
      navigate("/login");
    } else if (guestOnly && currentUser) {
      navigate("/");
    }
  }, [authOnly, guestOnly, currentUser, CULoading, navigate]);

  if (CULoading) return null; // while loading, show nothing

  return <>{children}</>;
}
