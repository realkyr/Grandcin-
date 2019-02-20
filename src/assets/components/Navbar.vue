<template>
  <b-navbar toggleable="md" class="myNav">
    <b-navbar-toggle target="nav_collapse" />

    <b-navbar-brand to="/" class="text-warning">GrandCiné</b-navbar-brand>

    <div>
      <MovieSearch ref="movieSearch" class="ml-5"/>
    </div>

    <b-collapse id="nav_collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-text class="text-warning">Welcome! {{ displayName }}</b-nav-text>
        <b-nav-item-dropdown right v-if="isAuth">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="LogOut">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="login" v-else><a class="text-warning">Log In</a></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import MovieSearch from './MovieSearch.vue'

export default {
  components: {
    MovieSearch
  },
  methods: {
    search(date) {
      this.$refs.movieSearch.search(event, date)
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
.myNav {
  background-color: black;
}
</style>

