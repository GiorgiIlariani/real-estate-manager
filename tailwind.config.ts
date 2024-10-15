import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		 boxShadow: {
        	'custom': '5px 5px 12px 0px rgba(2, 21, 38, 0.08)',
         },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
