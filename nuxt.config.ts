import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@nuxt/ui", "@nuxt/fonts", "motion-v/nuxt"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit", "@inspira-ui/plugins"]
    },
  },
});
