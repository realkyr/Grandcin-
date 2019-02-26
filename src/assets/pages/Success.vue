<template>
  <div>
    <Navbar />
    <div v-if="!isAuth">
      <b-container cols="12" sm="6" md="3">
        <b-row>
          <b-col md="12">
            <center>
              <p class="text-danger">
                ** ต้อง <b>Log In</b> ก่อนเพื่อทำการจ่ายเงิน **
              </p>
              <LogInForm />
            </center>
            <!-- use log in form component -->
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else>
      <b-container>
        <b-row>
          <b-col cols="12">
            <b-card
              class="border round border-warning bg-secondary text-warning payment-card"
            >
              <center>
                <h1>ชำระเงินสำเร็จ</h1>
              </center>
              <br />
              <center>
                <img
                  style="max-width: 150px; margin-bottom:20px;  
                  border: 2px rgb(255, 204, 0) solid; border-radius: 5px;"
                  :src="getMoviePhoto()"
                />
              </center>
              <br />
              <b>
                🎞 ชื่อภาพยนตร์ :
              </b>
              {{ $store.state.bookingInfo.movie.title }}
              <br />
              <br />
              <b>
                ✅ โรงภาพยนตร์ :
              </b>
              {{ $store.state.bookingInfo.theater.title }}
              <br />
              <br />
              <b>
                🗓 รอบของภาพยนตร์ :
              </b>
              {{ $store.state.bookingInfo.date }}
              {{ $store.state.bookingInfo.time }}
              <br /><br />
              <b>
                💺 ที่นั่งที่เลือก :
              </b>
              <span
                :key="seat"
                v-for="seat in $store.state.bookingInfo.seats"
                >{{ seat }}</span
              >
              <br />
              <br />
              <b class="h4">
                💰 ราคารวม :
              </b>
              {{ $store.state.bookingInfo.price }}
              <br />
              <br />
              <center>
                <b-button
                  @click="finish"
                  variant="success"
                  style="margin-right: 2px;"
                >
                  Finish
                  <!-- this is just dummy use after payment,
                        you can copy this function to use at another page -->
                </b-button>
                <br />
                <br />
              </center>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
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
    },
    // },
    getMoviePhoto() {
      let photoURL = this.$store.state.movies.filter(
        x => x.id === this.$store.state.bookingInfo.movie.id
      )[0].photoURL
      return photoURL
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

<style scoped>
.payment-card {
  width: 500px;
  margin-top: 5em;
  margin-right: auto;
  margin-left: auto;
  padding: 2em;
}
</style>
