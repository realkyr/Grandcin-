<template>
  <div>
    <Navbar />
    <MovieSearch ref="searchBar" @load="loadingScreen" @finish="initScreen" />
    <b-container v-if="!isFinish">
      Loading...<!-- implement loading here -->
    </b-container>
    <b-container v-if="isFinish">
      {{ this.$store.state.query.places.title }}
      <b-row>
        <b-col :key="i" v-for="i in dayList()" cols="4">
          <button @click="query($event, i)">
            {{ i }}
            <!-- 
              if you want to change date format change it here 
              use in-line methods
            -->
          </button>
        </b-col>
      </b-row>
      <div :key="movies[theater].id" v-for="theater in Object.keys(movies)">
        Theater {{ theater }} <br />
        <div
          :key="combine(movies[theater].id, title)"
          v-for="title in Object.keys(movies[theater].movies)"
        >
          <img
            style="max-width: 100px"
            :src="moviePhotoURL(movies[theater].movies[title].id)"
          />
          {{ title }}
          <button
            :key="combine(theater.id, title, time)"
            v-for="time in Object.keys(movies[theater].movies[title].airTime)"
            @click="
              select(
                {
                  title: title,
                  id: movies[theater].movies[title].id
                },
                {
                  title: $store.state.query.places.title,
                  id: $store.state.query.places.id
                },
                { title: theater, id: movies[theater].id },
                time
              )
            "
          >
            {{ time }}
          </button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MovieSearch from '../components/MovieSearch.vue'
import moment from 'moment'

export default {
  components: {
    Navbar,
    MovieSearch
  },
  data() {
    return {
      isFinish: true,
      date: moment()
        .tz('Asia/Bangkok')
        .format('YYYYMMDD')
    }
  },
  methods: {
    initScreen() {
      this.isFinish = true
    },
    loadingScreen() {
      this.isFinish = false
    },
    combine(...text) {
      return text.join(' ')
    },
    moviePhotoURL(id) {
      return this.$store.state.movies.filter(mov => mov.id === id)[0].photoURL
    },
    dayList() {
      return [
        moment()
          .tz('Asia/Bangkok')
          .format('YYYYMMDD'),
        moment()
          .add(1, 'days')
          .tz('Asia/Bangkok')
          .format('YYYYMMDD'),
        moment()
          .add(2, 'days')
          .tz('Asia/Bangkok')
          .format('YYYYMMDD')
      ]
    },
    query(event, date) {
      this.$refs.searchBar.search(event, date)
      this.date = date
    },
    select(movie, place, theater, time, date = this.date) {
      this.$store.state.showtime = { movie, place, theater, time, date }
      this.$router.push('/seat')
    }
  },
  mounted() {
    this.$refs.searchBar.search()
  },
  computed: {
    movies() {
      return this.$store.state.completeQuery
    }
  }
}
</script>
