<template>
  <div>
    <Navbar />
    <div style="padding: 2em">
      <img :src="movie.photoURL" style="max-height: 400px;" /> <br />
      <br />
      {{ movie.synopsis }} <br />
      Genre: {{ movie.genres.join(', ') }} <br />
      วันที่เข้าฉาย: {{ date() }}
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  created: async function() {
    this.movie = this.$store.state.movies.filter(
      movie => movie.id === this.$route.params.id
    )[0]
    if (!this.movie) {
      let db = firebase.firestore()
      let query = await db
        .collection('movies')
        .doc(this.id)
        .get()
      this.movie = query.data()
      console.log(this.movie)
    }
  },
  components: {
    Navbar
  },
  data() {
    return {
      id: this.$route.params.id,
      movie: {}
    }
  },
  methods: {
    date() {
      let upcomingDate = new Date(this.movie.date)
      return (
        upcomingDate.getDate().toString() +
        ' ' +
        (upcomingDate.getMonth() + 1).toString() +
        ' ' +
        upcomingDate.getFullYear()
      )
    }
  }
}
</script>
