<template>
  <div>
    <Navbar />
    <div v-if="!isAuth">
      ต้อง log in ก่อนเพื่อทำการจ่ายเงิน
      <LogInForm />
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
        <!-- this is just dummy use after payment -->
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
      let db = firebase.firestore()
      await db
        .collection('users')
        .doc(this.$store.state.user.uid)
        .collection('tickets')
        .add(this.$store.state.bookingInfo)

      // updatet this ticket to cinema profile
      let doc = await db
        .collection('branch')
        .doc(this.$store.state.bookingInfo.place.id)
        .collection('theater')
        .doc(this.$store.state.bookingInfo.theater.id)
        .collection('schedule')
        .doc(this.$store.state.bookingInfo.movie.id)
        .get()
      let booking = doc.data()
      for (let el of this.$store.state.bookingInfo.seats) {
        let bookingInfo = this.$store.state.bookingInfo
        booking[bookingInfo.date][bookingInfo.time][el] = false
        await db
          .collection('branch')
          .doc(this.$store.state.bookingInfo.place.id)
          .collection('theater')
          .doc(this.$store.state.bookingInfo.theater.id)
          .collection('schedule')
          .doc(this.$store.state.bookingInfo.movie.id)
          .update(booking)
      }
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.user.uid !== ''
    }
  }
}
</script>
