<template>
  <b-navbar toggleable="md" class="myNav">
    <!-- <b-navbar-toggle target="nav_collapse" /> -->
    <b-button
      variant="black"
      @click.prevent=""
      style="font-size:2rem;"
      class="text-warning mr-4"
      >&#9776;</b-button
    >
    <b-navbar-brand to="/" class="text-warning">GrandCiné</b-navbar-brand>
    <!-- <div> -->
    <b-collapse id="nav_collapse" is-nav>
      <MovieSearch
        ref="movieSearch"
        class="ml-auto"
        @load="loadingScreen"
        @finish="initScreen"
      />
    <!-- </div> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-text class="rightText text-warning">Welcome! {{ displayName }}</b-nav-text>
        <b-nav-item-dropdown right v-if="isAuth">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="LogOut">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="login" v-else class="">
          <a class="text-warning">Log In</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import moment from 'moment-timezone'
import firebase from 'firebase/app'
import 'firebase/auth'
import MovieSearch from './MovieSearch.vue'

export default {
  components: {
    MovieSearch
  },
  data() {
    return {
      isLoading: false,
      isFinish: true,
      date: moment()
        .tz('Asia/Bangkok')
        .format('YYYYMMDD') // return today as YEAR MONTH DAY format ex. 20191102
    }
  },
  methods: {
    search(event, date) {
      this.$refs.movieSearch.search(event, date)
    },
    initScreen() {
      // call this when loading finish
      this.$emit('finish')
    },
    loadingScreen() {
      // call this when you want to load this page
      this.$emit('loading')
    },
    LogOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          let central = this.$store.state.user
          central.uid = ''
          central.displayName = ''
          central.imgUrl = ''
          central.isAuth = false
        })
        .catch(function(error) {
          alert('Signout Fail!')
          console.log(error)
        })
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.user.isAuth
    },
    displayName() {
      let name = this.$store.state.user.displayName
      return name === '' ? 'Guest' : name
    }
  }
}
</script>

<style>
@media only screen and (max-width: 1090px){
  .rightText {
    display: none;
  }
}
.myNav {
  background-color: black;
  margin: auto;
}
</style>
