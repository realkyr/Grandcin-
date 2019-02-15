<template>
  <div>
    <Navbar />
    <b-container>
      {{ showtime.movie.title }}
      theater {{ showtime.theater.title }}
      {{ showtime.place.title }}
      {{ showtime.time }}
      <b-form-group id="adult" label="Adult :" label-for="adultInput">
        <b-form-input id="adultInput" type="number" v-model="adult" />
      </b-form-group>
      <b-form-group id="kid" label="kids :" label-for="kidInput">
        <b-form-input id="kidInput" type="number" v-model="kid" />
      </b-form-group>
      <br />
      <br />
      <br />
      <div class="display">
        <div class="seat" :key="i" v-for="i in row(seats)">
          {{ alpha[i - 1] }}
          <img
            :key="alpha[i - 1] + j"
            :ref="alpha[i - 1] + j"
            v-for="j in 20"
            :src="require('../pics/armchair.png')"
            @click="ticketClick($event, alpha[i - 1], j)"
          />
          {{ alpha[i - 1] }}
        </div>
      </div>
      <br />
      <br />
      <br />
      <b-button @click="save"> Proceed </b-button>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    Navbar
  },
  async created() {
    let store = this.$store.state.showtime
    if (Object.keys(store).length === 0 && store.constructor === Object) {
      this.$router.push('/')
    }
    this.showtime = this.$store.state.showtime
    let db = firebase.firestore()
    let ref = db
      .collection('branch')
      .doc(this.showtime.place.id)
      .collection('theater')
      .doc(this.showtime.theater.id)
    let data = await ref.get()
    this.seats = data.data().seats
  },
  data() {
    return {
      showtime: {},
      seats: 0,
      alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      adult: 0,
      kid: 0,
      ticketBook: [],
      seatsMap: {}
    }
  },
  methods: {
    checkNewLine(index) {
      if (index % 10 === 0) {
        return 'newLineSeat'
      } else return ''
    },
    row(seats) {
      return Math.floor(seats / 20)
    },
    ticketClick(event, row, col) {
      let ticketsAm = parseInt(this.adult) + parseInt(this.kid)
      if (this.ticketBook.includes(`${row}${col}`)) {
        this.ticketBook = this.ticketBook.filter(
          ticket => ticket !== `${row}${col}`
        )
        this.seatsMap[`${row}${col}`] = false
        this.$refs[`${row}${col}`][0].src = require('../pics/armchair.png')
        return
      }
      if (ticketsAm === 0) {
        alert('กรุณาเลือกจำนวนตั๋วก่อน')
        return
      } else if (this.ticketBook.length === ticketsAm) {
        let fTicket = this.ticketBook.shift()
        this.seatsMap[fTicket] = false
        this.$refs[fTicket][0].src = require('../pics/armchair.png')
      }
      event.target.src = require('../pics/seatcheck.png')
      this.ticketBook.push(`${row}${col}`)
      this.seatsMap[`${row}${col}`] = true
    },
    clear() {
      this.ticketBook.forEach(ticket => {
        console.log(this.seatsMap[ticket])
        this.seatsMap[ticket] = false
        this.$refs[ticket][0].src = require('../pics/armchair.png')
      })
      this.ticketBook = []
    },
    save() {
      if (this.ticketBook.length === 0) {
        alert('กรุณาเลือกตั๋วก่อน')
        return
      } else if (
        this.ticketBook.length !==
        parseInt(this.adult) + parseInt(this.kid)
      ) {
        alert('กรุณาเลือกตั๋วให้เท่ากับจำนวนที่ตั้งค่าไว้')
        return
      }
      this.$store.state.bookingInfo = this.showtime
      this.$store.state.bookingInfo.seats = this.ticketBook
      console.log(this.$store.state.bookingInfo)
      if (confirm('Booking Confirm?')) {
        this.$router.push('/payment')
      }
    }
  },
  watch: {
    kid: function(newValue, oldValue) {
      let diff = parseInt(newValue) - parseInt(oldValue)
      if (diff < 0) {
        this.clear()
      }
    },
    adult: function(newValue, oldValue) {
      let diff = parseInt(newValue) - parseInt(oldValue)
      if (diff < 0) {
        this.clear()
      }
    }
  }
}
</script>

<style scoped>
.seat img:nth-child(10) {
  margin-right: 50px;
}

.seat {
  margin-bottom: 10px;
}
</style>
