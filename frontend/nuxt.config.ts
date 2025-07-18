import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxtjs/tailwindcss"],
  css: ["~/assets/css/tailwind.css"],
  alias: {
    "@config": resolve(__dirname, "shared/config"),
  },
});
