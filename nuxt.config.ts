// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
   app: {
     pageTransition: { name: 'slide-up', mode: 'out-in' }
   },
  // SUMBER_URL from .env
  runtimeConfig: {
    public: {
      SUMBER_URL: process.env.SUMBER_URL
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/fonts'],
  css: ['~/assets/style.css'],
  tailwindcss: {
    configPath: 'tailwind.config',
  }
})