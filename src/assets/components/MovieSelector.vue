<template>
  <div
    v-click-outside="closeEvent"
    :style="{ visibility: visible }"
    class="movie-selector bg-inverse text-warning"
  >
    <div class="scrollView">
      <div
        @click="saveMovie(movie.title, movie.id, $event)"
        class="choice"
        :ref="movie.id"
        :key="movie.title"
        v-for="movie in moviesChoices"
      >
        <img :src="movie.photoURL" /> {{ movie.title }} <br />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  async mounted() {
    // fetch data from DB if not in Vuex store
    if (this.$store.state.movies.length === 0) {
      let moviesList = []
      let db = firebase.firestore()
      let query = await db.collection('movies').get()
      query.forEach(doc => {
        let movie = doc.data()
        movie.id = doc.id
        moviesList.push(movie)
      })
      this.$store.state.movies = moviesList
    }
    if (this.$store.state.query.movies.length !== 0) {
      // sync data which is selected when change page
      this.$store.state.query.movies.forEach(movie => {
        this.select.push(movie)
        this.$refs[movie.id][0].className = 'choice selected'
      })
    }
  },
  data() {
    return {
      select: []
    }
  },
  props: {
    visible: String,
    moviesChoices: Array
  },
  directives: {
    ClickOutside
  },
  methods: {
    saveMovie(title, id, event) {
      // when you select the element if selected change classes to choice selected
      // so you can implement style in these 2 classes
      let selectedEl = event.target
      if (selectedEl.tagName === 'IMG') {
        selectedEl = selectedEl.parentNode
      }
      if (selectedEl.className === 'choice selected') {
        selectedEl.className = 'choice'
        this.select = this.select.filter(el => el.id !== id)
      } else {
        selectedEl.className = 'choice selected'
        this.select.push({ title, id })
      }
      this.$emit('select', this.select)
    },
    closeEvent(event) {
      // when press outside box it will be trigger the Home page
      // to display none this component
      if (event.target.id !== 'MovieSelector') {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.movie-selector {
  position: absolute;
  background: white;
  padding: 0.5em;
  right: 30em;
  width: 500px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.scrollView {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.movie-selector::before {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -10px;
  width: 0;
  height: 0;
  content: '';
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}

.choice {
  border-bottom: 1px;
  border-bottom-style: solid;
  padding: 5px;
}

.choice:hover {
  background: black;
}

.selected {
  background: lemonchiffon;
}

.choice img {
  max-width: 100px;
}
</style>
