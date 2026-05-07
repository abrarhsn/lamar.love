import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxt/ui", "@nuxt/fonts", "motion-v/nuxt", "nuxt-music-flow"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit", "@inspira-ui/plugins"]
    },
  },
});