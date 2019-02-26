<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.$store.state.user.uid = user.uid
        this.$store.state.user.displayName = user.displayName
        this.$store.state.user.imgUrl = user.photoURL
        this.$store.state.user.isAuth = true
      } else {
        // No user is signed in.
      }
    })
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Prompt');
#app {
  font-family: 'Prompt', sans-serif;
}
</style>
