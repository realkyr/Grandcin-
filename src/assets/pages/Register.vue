<template>
  <div>
    <Navbar />
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          label="Email address:"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            ref="email"
            type="email"
            v-model="form.email"
            required
            placeholder="Enter email"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Your Name:">
          <b-form-input
            ref="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Enter name"
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
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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
