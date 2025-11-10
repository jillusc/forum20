import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  CurrentUserProvider,
  PostsProvider,
  ProfileProvider,
  ToastProvider,
} from "@/contexts";
import { system } from "@/theme";
import App from "@/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider value={system}>
        <CurrentUserProvider>
          <ProfileProvider>
            <PostsProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </PostsProvider>
          </ProfileProvider>
        </CurrentUserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
