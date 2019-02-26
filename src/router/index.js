import Vue from 'vue'
import Router from 'vue-router'
import Home from '../assets/pages/Home'
import Login from '../assets/pages/LogIn'
import Register from '../assets/pages/Register'
import Profile from '../assets/pages/Profile'
import Movie from '../assets/pages/Movie'
import Search from '../assets/pages/Search'
import SeatSelect from '../assets/pages/SeatSelect'
import Payment from '../assets/pages/Payment'
import Credit from '../assets/pages/CreditCard'
import Success from '../assets/pages/Success'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/movie/:id', component: Movie },
    { path: '/search', component: Search },
    { path: '/seat', component: SeatSelect },
    { path: '/payment', component: Payment },
    { path: '/credit', component: Credit },
    { path: '/success', component: Success }
  ]
})
