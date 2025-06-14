// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/supabase',
    'vuetify-nuxt-module'
  ],

  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      },
      defaults: {
        VBtn: {
          variant: 'flat'
        }
      },
      theme: {
        defaultTheme: 'light'
      }
    }
  },

  css: [
    '@mdi/font/css/materialdesignicons.css'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "vuetify/styles" as *;'
        }
      }
    }
  },

  typescript: {
    strict: true
  }
})