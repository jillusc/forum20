import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { system } from "./theme";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider value={system}>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
