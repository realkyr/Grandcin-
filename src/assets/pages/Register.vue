<template>
  <div class="main">
    <Navbar />
    <b-container
          class="form-group border rounded border-secondary bg-warning text-secondary"
          style="margin-top: 5em; margin-left: 20em; padding: 5em;">
      <b-form @submit="onSubmit" @reset="onReset">
        <center>
          <b-navbar-brand to="/" class="text-secondary">
            GrandCiné
          </b-navbar-brand>
        </center>
        <br />
        <b-form-group
          label="E-mail Address"
          description="We'll never share your E-mail with anyone else."
        >
          <b-form-input
            ref="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter Your E-mail"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Your Name">
          <b-form-input
            ref="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter Your Name"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Password">
          <b-form-input
            type="password"
            ref="password"
            autocomplete="new-password"
            v-model="form.password"
            required
            placeholder="Password"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Confirm Password">
          <b-form-input
            ref="confirm"
            autocomplete="new-password"
            type="password"
            v-model="form.confirmpassword"
            required
            placeholder="Confirm Your Password"
          >
          </b-form-input>
          <br />
        </b-form-group>
        <center>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </center>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        confirmpassword: ''
      }
    }
  },
  methods: {
    onSubmit: async function(evt) {
      // submit all data to firebase no validate yet
      evt.preventDefault()
      if (this.form.password !== this.form.confirmpassword) {
        alert('Error: Please type the same to confirm password')
      } else {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
        let currentUser = firebase.auth().currentUser
        try {
          await currentUser.updateProfile({
            displayName: this.form.name
          })
        } catch (error) {
          console.log(error)
        }
        this.setUpUser(currentUser)
        this.$store.state.user.displayName = this.form.name
        this.$router.push({ path: '/' })
      }
    },
    onReset() {
      this.form = {}
    },
    setUpUser(user) {
      // setup user in database Firestore
      let db = firebase.firestore()
      db.collection('users')
        .doc(user.uid)
        .set({
          displayName: this.form.name,
          fname: '',
          lname: '',
          birthdate: '',
          ticketList: [],
          photoUrl: ''
        })
    }
  }
}
</script>

<style scoped>
.main {
  background-color: white;
}
</style>
