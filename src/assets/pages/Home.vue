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
          <b-form-select id="MovieSelector" :options="movies.choices" />
        </b-col>
        <b-col cols="2">
          <b-button variant="outline-success">Search</b-button>
        </b-col>
      </b-row>
      <h1>Hello : {{ uid }}</h1>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      movies: {
        choices: ['Avengers: Endgame', 'John Wick 3'],
        select: ''
      },
      places: {
        choices: ['Seacon GrandCiné', 'Quatier GrandCiné'],
        select: ''
      }
    }
  },
  computed: {
    uid() {
      return this.$store.state.user.uid
    }
  }
}
</script>
