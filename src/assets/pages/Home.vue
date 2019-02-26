<template>
  <div class="main">
    <Navbar />
    <Carousel class="mb-3" />
    <b-container>
      <b-row>
        <b-col
          cols="12"
          sm="6"
          md="3"
          :key="movie.id"
          v-for="movie in $store.state.movies"
          class="movieEl mb-4 p-3"
          @click="viewDescription(movie.id)"
        >
          <!-- 
              this div contains each movie element. style it by change
              movieEl class (it stands for movie element)
            -->
          <img
            style="max-height: 200px"
            class="mx-auto d-block"
            :src="movie.photoURL"
          />
          <br />
          <b>🎞 Title : </b>{{ movie.title }} <b>({{ movie.year }})</b> <br />
          <b>💡 Genres : </b> {{ movie['genres'].join(', ') }} <br />
          <b>⌚ Length : </b> {{ movie.length }}
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
import Carousel from '../components/Carousel.vue'
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

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
    MovieSearch,
    Loading,
    Carousel
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
  background: rgb(255, 204, 0);
}

.movieEl {
  /* align-items: center; */
  color: rgb(255, 204, 0);
  /* background-color: gray; */
  /* border: 2px rgb(255, 204, 0) solid; */
  border-radius: 5px;
  /* margin-left: 25px;
  margin-right: 25px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 25px;
  padding-right: 25px;
  width: 100px; */
}
.movieEl img {
  align-items: center;
  border: 2px rgb(255, 204, 0) solid;
  border-radius: 5px;
}
.main {
  background-color: white;
}
</style>
