export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'light dark' }
      ]
    }
  },

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
          variant: 'flat',
          class: 'text-none letter-spacing-normal'
        }
      },
      theme: {
        defaultTheme: 'dark'
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
          additionalData: `
            @use "vuetify/styles" as *;
            $button-text-transform: none;
            $button-letter-spacing: normal;
          `
        }
      }
    }
  },

  typescript: {
    strict: true
  }
})