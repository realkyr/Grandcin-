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
          <b-button
            :key="combine(theater.id, title, time)"
            v-for="time in Object.keys(movies[theater].movies[title].airTime)"
            :disabled="isTimePassed(time)"
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
          </b-button>
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
        .format('YYYYMMDD') // return today as YEAR MONTH DAY format ex. 20191102
    }
  },
  methods: {
    initScreen() {
      // call this when loading finish
      this.isFinish = true
    },
    loadingScreen() {
      // call this when you want to load this page
      this.isFinish = false
    },
    combine(...text) {
      // just joining text with ' ' space
      return text.join(' ')
    },
    moviePhotoURL(id) {
      // find movie photo by id in Vuex
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
      ] // just create an array with 3 date today, tomorrow, the day after
    },
    query(event, date) {
      // call function search in searchBar component to query today's movie
      this.$refs.searchBar.search(event, date)
      this.date = date
    },
    select(movie, place, theater, time, date = this.date) {
      // when you select the time you want to watch
      this.$store.state.showtime = { movie, place, theater, time, date }
      this.$router.push('/seat')
    },
    isTimePassed(time) {
      // validate each button if the time is passed you can't booking
      // the movie which has a showtime in the past so return true if you can't press
      // false otherwise
      let today = moment().unix()
      let schedule = moment(this.date + ' ' + time, 'YYYYMMDD kk:mm').unix()
      console.log(this.date + ' ' + time)
      if (today >= schedule) {
        return true
      }
      return false
    }
  },
  mounted() {
    // init search in Mounted(Vue.js Lifecycle) prevent this page from error
    this.$refs.searchBar.search()
  },
  computed: {
    movies() {
      return this.$store.state.completeQuery
    }
  }
}
</script>
