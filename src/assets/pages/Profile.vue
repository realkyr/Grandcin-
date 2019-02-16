<template>
  <div>
    <Navbar />
    <b-container>
      Profile Page
      <div :key="ticket" class="ticket" v-for="ticket in Object.keys(tickets)">
        <!-- implement style and format here to make each ticket more beautiful
          or you can make it clickable -->
        {{ tickets[ticket].movie.title }}
        {{ tickets[ticket].date }}
        {{ tickets[ticket].time }}
        {{ tickets[ticket].place.title }}
        Seats : {{ tickets[ticket].seats.join(', ') }} Theater :
        {{ tickets[ticket].theater.title }}
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export default {
  async mounted() {
    // this function is called when Page mounted (Vue.js lifecycle)
    // get ticket if user is log in if not return to Home
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        let db = firebase.firestore()
        let tickets = {}
        let doc = await db
          .collection('users')
          .doc(user.uid)
          .collection('tickets')
          .get()
        doc.forEach(ticket => {
          tickets[ticket.id] = ticket.data()
        })
        this.tickets = tickets
      } else {
        this.$router.push('/')
      }
    })
  },
  components: {
    Navbar
  },
  data() {
    return {
      tickets: {}
    }
  }
}
</script>

<style scoped>
.ticket {
  padding: 20px 0px 20px 0px;
  border-top-style: solid;
  border-top-width: 1px;
  border-bottom: solid;
  border-bottom-width: 1px;
}
</style>
