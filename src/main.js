import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'
import App from '@/App.vue'
import router from '@/router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'
import LoadingButton from '@/components/ui/LoadingButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'

// init pinia store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// init vue app
const vueApp = createApp(App)

// add window
vueApp.config.globalProperties = window

// pimp-up app
vueApp
  .use(router)
  .use(pinia)
  .use(i18n)
  .component('LoadingButton', LoadingButton)
  .component('RouterLinkButton', RouterLinkButton)
  .component('AppContainer', AppContainer)
  .mount('#app')
