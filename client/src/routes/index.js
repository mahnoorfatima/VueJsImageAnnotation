import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home'
import ImageDetail from '../components/ImageDetail'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/image-details', component: ImageDetail,
    name: 'image-details',
    props: true 
    },
  ]
});