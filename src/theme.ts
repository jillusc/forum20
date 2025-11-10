import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const themeConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Quicksand', sans-serif" },
        body: { value: "'Quicksand', sans-serif" },
      },
      colors: {
        background: { value: "#fff" },
        text: { value: "#3c3c3c" },
        primary: { value: "#ffdab9" },
        secondary: { value: "#8b0000" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, themeConfig);
