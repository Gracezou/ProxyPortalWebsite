import { createI18n } from 'vue-i18n'
import i18nMessage from '~/locales'
export default defineNuxtPlugin(({ vueApp }) => {
  const language = useCookie('lang').value || 'en'
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    fallbackLocale: 'zh',
    locale: language,
    messages: i18nMessage
  })

  vueApp.use(i18n)
})
