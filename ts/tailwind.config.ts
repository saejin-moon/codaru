import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        body: ["LilGrotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Nemoy", "ui-sans-serif", "system-ui", "sans-serif"],
        crude: ["Crude", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
