import Vue from 'vue'
import App from './App.vue'
import { config } from '../config/firebase'
import router from './router'
import store from './store'
import * as firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

firebase.initializeApp(config)
Vue.use(BootstrapVue)

export const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
