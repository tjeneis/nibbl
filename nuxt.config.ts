export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'light dark' }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
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
        },
        VChip: {
          variant: 'flat'
        },
        VTextField: {
          hideDetails: 'auto'
        }
      },
      theme: {
        defaultTheme: 'dark',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#f72585',
              secondary: '#7209b7',
              accent: '#4361ee',
              success: '#4cc9f0',
              error: '#f72585',
              warning: '#7209b7',
              info: '#4361ee'
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#f72585',
              secondary: '#7209b7',
              accent: '#4361ee',
              success: '#4cc9f0',
              error: '#f72585',
              warning: '#7209b7',
              info: '#4361ee'
            }
          }
        }
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
  },
})