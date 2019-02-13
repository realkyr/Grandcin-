<template>
  <div>
    <Navbar />
    <b-container fluid>
      <b-row>
        <b-col cols="1">สถานที่ :</b-col>
        <b-col cols="4">
          <b-form-select id="PlaceSelector" :options="places.choices" />
        </b-col>
        <b-col cols="1">หนัง :</b-col>
        <b-col cols="4">
          <div
            size="sm"
            variant="outline-success"
            id="MovieSelector"
            @click="setVisibility('visible')"
            class="movies-select-tap"
          >
            {{
              movies.select == []
                ? 'Search Movie'
                : movies.select.map(mv => mv.title).join(', ')
            }}
          </div>
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-success">Search</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <MovieSelector
        @select="setMovieSelect"
        @close="setVisibility('hidden')"
        :visible="visible"
        :moviesChoices="movies.choices"
      />
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
import MovieSelector from '../components/MovieSelector.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  beforeMount: async function() {
    let moviesList = []
    let db = firebase.firestore()
    let query = await db.collection('movies').get()
    query.forEach(doc => {
      let movie = doc.data()
      movie.id = doc.id
      moviesList.push(movie)
    })
    this.$store.state.movies = moviesList
    this.movies.choices = this.$store.state.movies
      .filter(el => el.isOnAir)
      .map(el => el)
  },
  components: {
    Navbar,
    MovieSelector
  },
  data() {
    return {
      movies: {
        choices: [],
        select: []
      },
      places: {
        choices: ['Seacon GrandCiné', 'Quatier GrandCiné'],
        select: ''
      },
      visible: 'hidden'
    }
  },
  methods: {
    setVisibility(status) {
      this.visible = status
    },
    setMovieSelect(value) {
      this.movies.select = value
    },
    viewDescription(id) {
      this.$router.push('/movie/' + id)
    }
  },
  computed: {
    uid() {
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

.movies-select-tap {
  border-style: solid;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: inline-block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  overflow: hidden;
}
</style>
