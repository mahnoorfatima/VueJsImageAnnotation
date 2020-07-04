import Vue from 'vue'
import App from './App.vue'
import Vodal from 'vodal';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { router } from './routes';
Vue.component(Vodal.name, Vodal, Loading);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
