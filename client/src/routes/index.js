import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home'
import ImageDetail from '../components/Image'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/detail', component: ImageDetail,
    name: 'detail',
    props: true 
    },
  ]
});