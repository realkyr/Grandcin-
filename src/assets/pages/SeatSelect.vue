<template>
  <div>
    <Navbar />
    <b-container>
      {{ showtime.movie.title }}
      theater {{ showtime.theater.title }}
      {{ showtime.place.title }}
      {{ showtime.time }}
      <div v-if="!isFinish">
        Loading
        <!-- Implement loading here -->
      </div>
      <div v-else>
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
              :src="owner(alpha[i - 1] + j)"
              @click="ticketClick($event, alpha[i - 1], j)"
            />
            {{ alpha[i - 1] }}
          </div>
        </div>
        <br />
        <br />
        <br />
        <b-button @click="save"> Proceed </b-button>
      </div>
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
    // if no booking data route to Home
    let store = this.$store.state.showtime
    if (Object.keys(store).length === 0 && store.constructor === Object) {
      this.$router.push('/')
    }

    // get amount of seats ex. 150 seats in this theater
    this.showtime = this.$store.state.showtime
    let db = firebase.firestore()
    let ref = db
      .collection('branch')
      .doc(this.showtime.place.id)
      .collection('theater')
      .doc(this.showtime.theater.id)
    let data = await ref.get()
    this.seats = data.data().seats

    // get object so the web will know which seats are booked
    let doc = await db
      .collection('branch')
      .doc(this.showtime.place.id)
      .collection('theater')
      .doc(this.showtime.theater.id)
      .collection('schedule')
      .doc(this.showtime.movie.id)
      .get()

    // just copy them to local component state
    this.seatsMap = doc.data()[this.showtime.date]
    this.haveOwner = Object.keys(this.seatsMap[this.showtime.time])
    this.isFinish = true
  },
  data() {
    return {
      showtime: {},
      seats: 0,
      alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      adult: 0,
      kid: 0,
      ticketBook: [],
      seatsMap: {},
      haveOwner: [],
      isFinish: false
    }
  },
  methods: {
    checkNewLine(index) {
      if (index % 10 === 0) {
        // useless for now you can learn how to use it
        return 'newLineSeat'
      } else return ''
    },
    row(seats) {
      // calculated how many row of seats
      return Math.floor(seats / 20)
    },
    ticketClick(event, row, col) {
      // trigger when click a seat
      if (this.haveOwner.includes(row + col)) {
        alert('ที่นั่งนี้มีคนจองแล้ว')
        return
      }
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
      // clear the selected seat when adult or kid value are subtracted
      this.ticketBook.forEach(ticket => {
        console.log(this.seatsMap[ticket])
        this.seatsMap[ticket] = false
        this.$refs[ticket][0].src = require('../pics/armchair.png')
      })
      this.ticketBook = []
    },
    save() {
      // proceed to next step
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
      this.$store.state.bookingInfo.ticketType = {}
      this.$store.state.bookingInfo.ticketType.adult = this.adult
      this.$store.state.bookingInfo.ticketType.kid = this.kid
      this.$store.state.bookingInfo.seats = this.ticketBook
      this.$store.state.bookingInfo.haveOwner = this.haveOwner
      if (confirm('Booking Confirm?')) {
        this.$router.push('/payment')
      }
    },
    owner(seat) {
      // select which photo to use for each seat
      // if seat is in array this.haveOwner
      if (this.haveOwner.includes(seat)) {
        return require('../pics/peopleseat.png')
      } else return require('../pics/armchair.png')
    }
  },
  watch: {
    // create watch to watch when kid or adult value change
    // if it is less than previous value clear all the selected seat
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
