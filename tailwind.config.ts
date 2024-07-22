import twPlugins from "./tailwindcss/tw-plugins"
import twTheme from "./tailwindcss/tw-theme"
import type { Config } from "tailwindcss"

const config = {
  darkMode: [ "class" ],
  content: [
    'index.html',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: twTheme,
  plugins: twPlugins,
} satisfies Config

export default config