<template>
  <div>
    <b-navbar toggleable="md" class="myNav">
      <!-- <b-navbar-toggle target="nav_collapse" /> -->
      <!-- <b-button
        variant="black"
        @click.prevent="isClick = !isClick"
        style="font-size:2rem;"
        class="text-warning mr-4"
        >&#9776;</b-button
      > -->
      <!-- GrandCiné -->
      <b-navbar-brand to="/" class="logo ml-4">
        <img height="80px" src="../pics/logo.png" />
      </b-navbar-brand>
      <MovieSearch
        ref="movieSearch"
        class="ml-auto"
        @load="loadingScreen"
        @finish="initScreen"
      />
      <!-- <b-collapse id="nav_collapse" is-nav> -->
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-text class="rightText text-warning">
          Welcome! {{ displayName }}
        </b-nav-text>
        <b-nav-item-dropdown right v-if="isAuth">
          <!-- Using button-content slot -->
          <template slot="button-content" class="bg-warning">
            <span class="myDropdown text-warning">🔻</span>
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="LogOut">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="login" v-else class="">
          <a class="text-warning">Log In</a>
        </b-nav-item>
      </b-navbar-nav>
      <!-- </b-collapse> -->
    </b-navbar>
    <div v-show="isClick" id="menu">
      <div class="inner">
        <a
          class="close text-warning"
          @click="isClick = false"
          style="float: left; line-height: 2em;"
          >X</a
        ><br />
        <ul class="links">
          <li>
            <b v-show="menu1" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu1 = true"
              @mouseleave="menu1 = false"
              class="text-warning"
              href="#"
              >Menu 1</a
            >
          </li>
          <li>
            <b v-show="menu2" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu2 = true"
              @mouseleave="menu2 = false"
              class="text-warning"
              href="#"
              >Menu 2</a
            >
          </li>
          <li>
            <b v-show="menu3" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu3 = true"
              @mouseleave="menu3 = false"
              class="text-warning"
              href="#"
              >Menu 3</a
            >
          </li>
          <li>
            <b v-show="menu4" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu4 = true"
              @mouseleave="menu4 = false"
              class="text-warning"
              href="#"
              >Menu 4</a
            >
          </li>
          <li>
            <b v-show="menu5" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu5 = true"
              @mouseleave="menu5 = false"
              class="text-warning"
              href="#"
              >Menu 5</a
            >
          </li>
          <li>
            <b v-show="menu6" class="text-warning" style="margin-right: 5px;"
              >></b
            >
            <a
              @mouseover="menu6 = true"
              @mouseleave="menu6 = false"
              class="text-warning"
              href="#"
              >Menu 6</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
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
      isClick: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      menu5: false,
      menu6: false,
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
@media only screen and (max-width: 1018px) {
  .rightText {
    display: none;
  }
  .myDropdown {
    float: right;
  }
}
@media only screen and (max-width: 720px) {
  .logo {
    display: block;
    margin: auto;
  }
}
.myNav {
  background-color: black;
  margin: auto;
}

#menu {
  background-color: black;
  opacity: 0.8;
  text-align: center;
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
}

.close {
  margin-left: 10px;
}

.links {
  list-style-type: none;
  line-height: 6em;
  font-size: 20px;
}
</style>
