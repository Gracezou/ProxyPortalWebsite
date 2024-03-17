
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
// config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    // head
    head: {
      title: 'Ruby Proxy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Ruby Proxy', },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // css
  css: ["~/assets/scss/index.scss"],

  // build modules
  modules: [
    "@element-plus/nuxt",
    'nuxt-twemoji'
  ],

  typescript: {
    strict: true,
    shim: false,
  },
  build: {
    transpile: ['vue-i18n', /echarts/, 'lodash-es'],
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
