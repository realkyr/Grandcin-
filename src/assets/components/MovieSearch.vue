<template>
  <div>
    <b-container>
      <b-row align-v="center">
        <b-col cols="0" class="col-sm-0 text-warning">สถานที่ :</b-col>
        <b-col cols="3">
          <b-form-select
          class="text-warning"
            id="PlaceSelector"
            v-model="places.select"
            :options="places.choices.map(el => el.title)"
          />
        </b-col>
        <b-col cols="0" class="text-warning">หนัง :</b-col>
        <b-col cols="3">
          <div
            size="sm"
            variant="outline-success"
            id="MovieSelector"
            @click="setVisibility('visible')"
            class="movies-select-tap align-middle text-warning"
          >
            {{
              movies.select == []
                ? 'Search Movie'
                : movies.select.map(mv => mv.title).join(', ')
            }}
          </div>
        </b-col>
        <b-col cols="2">
          <b-button @click="search" style="margin-left:100px" variant="outline-warning">Search</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <MovieSelector
        @select="setMovieSelect"
        @close="setVisibility('hidden')"
        :visible="visible"
        :moviesChoices="choices"
      />
    </b-container>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import MovieSelector from '../components/MovieSelector.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  created() {
    this.movies.select = this.$store.state.query.movies
    this.places.select = this.$store.state.query.places.title
  },
  components: {
    MovieSelector
  },
  data() {
    return {
      movies: {
        select: []
      },
      places: {
        choices: [
          { title: 'Seacon GrandCiné', id: 'WFUoAjefnU4GpWLFfb2f' },
          { title: 'Quatier GrandCiné', id: 'nyIIbxemgNtnKfYwu711' }
        ],
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
    async search(
      value,
      date = moment()
        .tz('Asia/Bangkok')
        .format('YYYYMMDD')
    ) {
      this.$emit('load')
      this.saveData()
      const moviesSchedule = {}
      let db = firebase.firestore()
      if (!this.$store.state.query.places) {
        this.$emit('finish')
        return
      }
      let place = this.$store.state.query.places.id
      let theaterList = await this.getTheater(db, place)
      for (const thea of Object.keys(theaterList)) {
        for (const mov of this.$store.state.query.movies) {
          let ref = db
            .collection('branch')
            .doc(place)
            .collection('theater')
            .doc(thea)
            .collection('schedule')
            .doc(mov.id)
          let schedule = await ref.get()
          let daySchedule = this.schedule(date, schedule.data())
          if (daySchedule) {
            let name = theaterList[thea].name
            if (!moviesSchedule[name]) {
              moviesSchedule[name] = {}
              moviesSchedule[name].movies = {}
              moviesSchedule[name].id = thea
            }
            moviesSchedule[name].movies[mov.title] = {}
            moviesSchedule[name].movies[mov.title].airTime = daySchedule
            moviesSchedule[name].movies[mov.title].id = mov.id
          }
        }
      }
      this.$store.state.completeQuery = moviesSchedule
      this.$emit('finish')
      this.$router.push('/search')
    },
    schedule(date, data) {
      if (!data) return false
      if (data[date]) {
        return data[date]
      } else {
        return false
      }
    },
    saveData() {
      this.$store.state.query.movies = this.movies.select
      this.$store.state.query.places = this.places.choices.filter(
        ch => ch.title === this.places.select
      )[0]
      console.log(this.$store.state.query.places)
    },
    async getTheater(db, id) {
      let ref = db
        .collection('branch')
        .doc(id)
        .collection('theater')
      let allTheater = {}
      let theaters = await ref.get()
      theaters.forEach(title => {
        allTheater[title.id] = title.data()
      })
      return allTheater
    }
  },
  computed: {
    choices() {
      return this.$store.state.movies.filter(el => el.isOnAir).map(el => el)
    }
  }
}
</script>

<style scoped>
.movies-select-tap {
  border-style: solid;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: inline-block;
  width: 250px;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  overflow: hidden;
}
</style>
