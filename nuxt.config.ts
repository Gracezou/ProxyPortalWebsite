
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
// config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    // head
    head: {
      title: 'Ruby Proxy',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Ruby Proxy',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // css
  css: ["~/assets/scss/index.scss"],

  // build modules
  modules: [
    "@element-plus/nuxt",
  ],

  typescript: {
    strict: true,
    shim: false,
  },
  build: {
    transpile: ['vue-i18n']
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/global.scss" as element;`,
        },
      },
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ]
  },
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
  },
})
