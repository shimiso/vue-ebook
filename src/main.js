import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'
import 'lib-flexible'
import './assets/styles/icon.css'
import animated from 'animate.css'
Vue.use(animated)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
