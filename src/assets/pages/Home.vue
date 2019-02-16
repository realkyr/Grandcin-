<template>
  <div>
    <Navbar />
    <MovieSearch />
    <b-container>
      <b-row>
        <b-col
          cols="12"
          sm="6"
          md="3"
          :key="movie.id"
          v-for="movie in $store.state.movies"
          class="movieEl"
          @click="viewDescription(movie.id)"
        >
          <!-- 
              this div contains each movie element. style it by change
              movieEl class (it stands for movie element)
            -->
          <img style="max-height: 250px" :src="movie.photoURL" />
          <br />
          {{ movie.title }} ({{ movie.year }}) <br />
          {{ movie['genres'].join(', ') }} <br />
          length: {{ movie.length }}
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MovieSearch from '../components/MovieSearch.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  created: async function() {
    // this function use to fetch movies from DB
    let moviesList = []
    let db = firebase.firestore()
    let query = await db.collection('movies').get()
    query.forEach(doc => {
      let movie = doc.data()
      movie.id = doc.id
      moviesList.push(movie)
    })
    this.$store.state.movies = moviesList
    // store all data in Vuex store
  },
  components: {
    Navbar,
    MovieSearch
  },
  methods: {
    viewDescription(id) {
      // when click div this function called and route to another page
      this.$router.push('/movie/' + id)
    }
  },
  computed: {
    uid() {
      // get uid from store
      return this.$store.state.user.uid
    }
  }
}
</script>

<style scoped>
.movieEl:hover {
  color: white;
  background: tomato;
}
</style>
