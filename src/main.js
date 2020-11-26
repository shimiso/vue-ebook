import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'
import i18n from './lang'
import 'lib-flexible'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import animated from 'animate.css'
// import './mock'

Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
