import { Route, Routes } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import "./api/axiosDefaults";
import { AddPostForm, HomePage, NavBar, PostPage } from "@/components";
import { LogInForm, SignUpForm } from "@/components/auth";
import ActivityPage from "./components/ActivityPage";
import FeedPage from "./components/FeedPage";

function App() {
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
        Aside
      </GridItem>

      <GridItem area="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/posts/create" element={<AddPostForm />} />
          {/*
            <Route path="/posts/:id/edit" element={<EditPostForm />} />
          */}
          <Route path="/posts/:id" element={<PostPage />} />
          {/*
           <Route
              path="/profiles/:id/edit/password"
              element={<ChangePasswordForm />}
            />
            <Route path="/profiles/:id/edit" element={<EditProfileForm />} />
            <Route path="/profiles/:id" element={<ProfilePage />} />
            // catch-all route
            <Route path="*" element={<NotFound />} />
            */}
        </Routes>
      </GridItem>

      <GridItem area="footer">Footer</GridItem>
    </Grid>
  );
}

export default App;
