import { Route, Routes, useLocation } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import "@/api/axiosDefaults";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import {
  ActivityPage,
  FeedPage,
  HomePage,
  PageNotFound,
  PostPage,
  ProfilePage,
} from "@/pages";
import {
  AddPostForm,
  EditPostForm,
  NavBar,
  TopProfilesAside,
} from "@/components";
import {
  ChangePasswordForm,
  EditProfileForm,
  LogInForm,
  SignUpForm,
} from "@/components/auth";
import { RouteWrapper } from "./components/routes/RoutesWrapper";

function App() {
  const currentUser = useCurrentUser();
  const location = useLocation();

  // define which routes should show the TopProfiles aside:
  const showAside =
    location.pathname === "/" ||
    location.pathname === "/feed" ||
    location.pathname === "/activity" ||
    location.pathname.startsWith("/profiles/");

  return (
    <Grid
      templateAreas={{
        // define layout structure, naming areas within a row
        base: `"nav" "main" "footer"`,
        lg: `"nav nav nav nav"
        "aside main main empty"
        "footer footer footer footer"`, // each string represents a row
      }}
      templateColumns={{
        base: "1fr",
        lg: "22% 1fr 1fr 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="aside" hideBelow="lg">
        {currentUser && showAside && <TopProfilesAside />}
      </GridItem>

      <GridItem area="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/feed"
            element={
              <RouteWrapper authOnly>
                <FeedPage />
              </RouteWrapper>
            }
          />
          <Route
            path="/activity"
            element={
              <RouteWrapper authOnly>
                <ActivityPage />
              </RouteWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <RouteWrapper guestOnly>
                <LogInForm />
              </RouteWrapper>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <RouteWrapper guestOnly>
                <SignUpForm />
              </RouteWrapper>
            }
          ></Route>
          <Route
            path="/posts/create"
            element={
              <RouteWrapper authOnly>
                <AddPostForm />
              </RouteWrapper>
            }
          ></Route>
          <Route
            path="/posts/:id/edit"
            element={
              <RouteWrapper authOnly>
                <EditPostForm />
              </RouteWrapper>
            }
          ></Route>
          <Route
            path="/posts/:id"
            element={
              <RouteWrapper authOnly>
                <PostPage />
              </RouteWrapper>
            }
          ></Route>

          <Route
            path="/profiles/:id/edit/password"
            element={
              <RouteWrapper authOnly>
                <ChangePasswordForm />
              </RouteWrapper>
            }
          ></Route>

          <Route
            path="/profiles/:id/edit"
            element={
              <RouteWrapper authOnly>
                <EditProfileForm />
              </RouteWrapper>
            }
          ></Route>
          <Route
            path="/profiles/:id"
            element={
              <RouteWrapper authOnly>
                <ProfilePage />
              </RouteWrapper>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </GridItem>

      <GridItem area="footer"></GridItem>
    </Grid>
  );
}

export default App;
