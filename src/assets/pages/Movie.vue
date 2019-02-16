<template>
  <div>
    <Navbar />
    <div style="padding: 2em">
      <img :src="movie.photoURL" style="max-height: 400px;" /> <br />
      <br />
      {{ movie.synopsis }} <br />
      <!-- short story of the movie -->
      Genre: {{ movie.genres.join(', ') }} <br />
      วันที่เข้าฉาย: {{ date() }}
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  created: async function() {
    // this function will be called when this pages created
    // read more about Vue.js LifeCycle
    // fetch data from DB if movies in Vuex is empty
    if (this.$store.state.movies.length === 0) {
      let db = firebase.firestore()
      let query = await db
        .collection('movies')
        .doc(this.id)
        .get()
      this.movie = query.data()
    } else {
      this.movie = this.$store.state.movies.filter(
        movie => movie.id === this.$route.params.id
      )[0]
    }
  },
  components: {
    Navbar
  },
  data() {
    return {
      id: this.$route.params.id,
      movie: {
        photoURL: '',
        genres: []
      }
    }
  },
  methods: {
    date() {
      // convert Timestamp into Date
      // you can change format here
      // just use the value which return from moment(xxx).format(xxx)
      // use console.log() to see what kind of data
      // then use if-else or array index to change it into Thai lang or whatever
      return moment(this.movie.date).format('LL')
    }
  }
}
</script>
