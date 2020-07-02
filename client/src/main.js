import Vue from 'vue'
import App from './App.vue'
import Vodal from 'vodal';
import { router } from './routes';
Vue.component(Vodal.name, Vodal);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
