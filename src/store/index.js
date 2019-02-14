import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      isAuth: false,
      displayName: '',
      imgUrl: ''
    },
    movies: [],
    query: {
      movies: [],
      places: { title: '' }
    },
    completeQuery: {}
  }
})
