import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import "./fonts";

const themeConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Quicksand', sans-serif" },
        body: { value: "'Quicksand', sans-serif" },
      },
      colors: {
        background: {
          500: { value: "#fff" },
        },
        text: {
          500: { value: "#3c3c3c" },
        },
        primary: {
          500: { value: "#ffdab9" },
        },
        secondary: {
          500: { value: "#8b0000" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);
