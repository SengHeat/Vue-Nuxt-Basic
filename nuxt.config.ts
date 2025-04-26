export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // Optional: Compatibility date for the Nuxt app
  devtools: { enabled: true },     // Optional: Enables Nuxt Devtools in development

  modules: ['@nuxtjs/tailwindcss'], // Include Tailwind CSS module

  css: ['@/assets/css/main.css'],   // Path to your custom CSS file (tailwind base)
})
