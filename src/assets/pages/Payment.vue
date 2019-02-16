<template>
  <div>
    <Navbar />
    <div v-if="!isAuth">
      ต้อง log in ก่อนเพื่อทำการจ่ายเงิน
      <LogInForm />
      <!-- use log in form component -->
    </div>
    <div v-else>
      {{ $store.state.bookingInfo }}
      <br />
      <b-button>
        Paypal
      </b-button>
      <br />
      <br />
      <b-button>
        Credit/Debit Card
      </b-button>
      <b-button @click="finish">
        finish
        <!-- this is just dummy use after payment,
              you can copy this function to use at another page -->
      </b-button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import LogInForm from '../components/LogInForm.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  created() {
    // if no ticket booking data this page will be useless so route to home page
    let store = this.$store.state.bookingInfo
    if (Object.keys(store).length === 0 && store.constructor === Object) {
      this.$router.push('/')
    }
  },
  components: {
    LogInForm,
    Navbar
  },
  methods: {
    async finish() {
      // update this ticket to user profile
      let bookingInfo = this.$store.state.bookingInfo
      let db = firebase.firestore()
      let myTicket = { ...this.$store.state.bookingInfo }
      delete myTicket['haveOwner']
      delete myTicket['map']
      await db
        .collection('users')
        .doc(this.$store.state.user.uid)
        .collection('tickets')
        .add(myTicket)
      console.log(bookingInfo)

      // update this ticket to cinema profile
      let booking = {}
      booking[bookingInfo.date] = bookingInfo.map
      await db
        .collection('branch')
        .doc(bookingInfo.place.id)
        .collection('theater')
        .doc(bookingInfo.theater.id)
        .collection('schedule')
        .doc(bookingInfo.movie.id)
        .update(booking)
      this.$router.push('/profile')
    }
  },
  computed: {
    isAuth() {
      // check is user log in or not
      return this.$store.state.user.uid !== ''
    }
  }
}
</script>
