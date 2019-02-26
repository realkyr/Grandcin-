<template>
  <div>
    <Navbar />
    <b-container
      style="margin-top: 8em; padding: 5em;"
      class="border round border-warning bg-secondary text-warning"
    >
      <center>
        <b style="font-size: 2em;">Profile Page</b>
      </center>
      <br />
      <div>
        <!-- implement style and format here to make each ticket more beautiful
          or you can make it clickable -->
        <b-container>
          <b-row>
            <b-col
              :key="ticket"
              class="ticket"
              v-for="ticket in Object.keys(tickets)"
              style="margin-left: 55px;"
              cols="12"
              sm="6"
              md="5"
            >
              <b-card>
                <b>🎞 Name : </b>{{ tickets[ticket].movie.title }}<br />
                <b>🗓 Date : </b>{{ tickets[ticket].date }}<br />
                <b>⌚ Show Time : </b>{{ tickets[ticket].time }}<br />
                <b>🎬 Cinema : </b>{{ tickets[ticket].place.title }}<br />
                <b>💺 Seats : </b>{{ tickets[ticket].seats.join(', ') }}<br />
                <b>✅ Theater : </b>{{ tickets[ticket].theater.title }}<br />
                <br />
                <center>
                  <b-button variant="success" style="margin: 10px;">
                    Print-Ticket
                  </b-button>
                  <b-button variant="warning" style="margin: 10px;">
                    Send Ticket to E-mail
                  </b-button>
                  <br />
                  <b-button variant="danger" style="margin-right: 15px;">
                    Refund
                  </b-button>
                </center>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
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
