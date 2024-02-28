import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.ts"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
} satisfies Config;
