<template>
  <div>
    <Navbar ref="nav" @loading="loadingScreen" @finish="initScreen" />
    <b-container v-if="!isFinish">
      <Loading :active="!isFinish" :is-full-page="true" />
      <!-- loading ... -->
      <!-- implement loading here -->
    </b-container>
    <div class="test shadow mt-5 p-2">
      <b-container v-if="isFinish">
        <!-- {{ this.$store.state.query.places.title }} -->
        <b-row align-v="center" class="justify-content-around mx-auto">
          <b-col :key="i" v-for="i in dayList()" cols="3">
            <b-button variant="outline-warning" @click="query($event, i)">
              {{ i }}
              <!-- 
                if you want to change date format change it here 
                use in-line methods
              -->
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="blogL">
      <div class="book_branch shadow">
        <div class="text-warning h2 pt-2 pl-4">
          {{ this.$store.state.query.places.title }}
        </div>
      </div>
      <div
        class="book_row shadow-sm"
        :key="movies[theater].id"
        v-for="theater in Object.keys(movies)"
      >
        <div class="booking" v-show="Object.keys(movies).length > 0">
          <div class="book_right">
            <div class="book_theatre_no ml-1">Theatre {{ theater }} <br /></div>
          </div>
          <div
            class="book_left"
            :key="combine(movies[theater].id, title)"
            v-for="title in Object.keys(movies[theater].movies)"
          >
            <img
              style="max-width: 120px"
              :src="moviePhotoURL(movies[theater].movies[title].id)"
            />
            <div class="book_desc">
              <div class="book_title">
                <h3>{{ title }} |</h3>
              </div>
              <div class="mt-5 ml-5">
                <b-button
                  class="book_time text-warning"
                  variant="dark"
                  :key="combine(theater.id, title, time)"
                  v-for="time in Object.keys(
                    movies[theater].movies[title].airTime
                  )"
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
          </div>
        </div>
        <div class="book_row" v-show="Object.keys(movies).length == 0">
          <h2>ไม่มีรอบ</h2>
        </div>
      </div>
    </div>
    <!-- <div class="blogR">
      <div class="blog_right_contain d-block mx-auto">
        <h3>รอบที่เลือก</h3>
      </div>
    </div> -->
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MovieSearch from '../components/MovieSearch.vue'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Navbar,
    MovieSearch,
    Loading
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
          .format('dddd DD/MM/YYYY'),
        moment()
          .add(1, 'days')
          .tz('Asia/Bangkok')
          .format('dddd DD/MM/YYYY'),
        moment()
          .add(2, 'days')
          .tz('Asia/Bangkok')
          .format('dddd DD/MM/YYYY'),
        moment()
          .add(3, 'days')
          .tz('Asia/Bangkok')
          .format('dddd DD/MM/YYYY')
      ] // just create an array with 3 date today, tomorrow, the day after
    },
    query(event, date) {
      // call function search in searchBar component to query today's movie
      date = moment(date, 'dddd DD/MM/YYYY').format('YYYYMMDD')
      this.$refs.nav.search(event, date)
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
      if (today >= schedule) {
        return true
      }
      return false
    }
  },
  mounted() {
    // init search in Mounted(Vue.js Lifecycle) prevent this page from error
    this.$refs.nav.search()
  },
  computed: {
    movies() {
      return this.$store.state.completeQuery
    }
  }
}
</script>

<style>
.test {
  border-left-style: none;
  border-right-style: none;
  background-color: black;
}
.book_branch {
  margin-top: 20px;
  position: relative;
  border-bottom: 1px solid #000;
  height: 54px;
  max-width: 810px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #515151),
    color-stop(100%, #181818)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    top,
    #515151 0%,
    #181818 100%
  ); /* Chrome10+,Safari5.1+ */
}
.book_row {
  background: #ddd;
  clear: both;
  min-height: 195px;
  max-width: 810px;
  position: relative;
}
.book_right {
  background: #cda93d none repeat scroll 0 0;
  float: right;
  min-height: 195px;
  margin-bottom: 10px;
  color: white;
}
.book_theatre_no {
  display: block;
  font-size: 30px;
  font-weight: bold;
  margin-top: 65px;
  text-align: center;
  text-shadow: 0 1px 0 #fff;
}
.book_left {
  border-bottom: 1px solid #b2b2b2;
  min-height: 195px;
  border-left: 1px solid #b2b2b2;
  display: block;
}
.book_left img {
  float: left;
  margin-left: 20px;
  margin-top: 1.299%;
  margin-right: 20px;
  border-radius: 5px;
}
.book_title {
  max-width: 100%;
  display: block;
  margin: auto;
}
.book_desc {
  padding-left: 22px;
  padding-top: 16px;
  width: 80%;
}
.book_time {
  display: inline-block;
  margin: auto;
  margin-right: 15px;
  margin-top: 10px;
  /* padding: 2px 11px; */
}
.blogL {
  display: block;
  margin: auto;
  margin-top: 20px;
  max-width: 810px;
}
</style>
