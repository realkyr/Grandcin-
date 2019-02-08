import Vue from 'vue'
import Router from 'vue-router'
import Home from '../assets/pages/Home.vue'
import Login from '../assets/pages/LogIn.vue'
import Register from '../assets/pages/Register.vue'
import Profile from '../assets/pages/Profile'
Vue.use(Router)

export default new Router({
  base: 'xsample',
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile }
  ]
})
