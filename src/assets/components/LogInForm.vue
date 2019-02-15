<template>
  <div>
    <b-form inline>
      <label class="sr-only" for="inlineFormInputName2">Name</label>
      <b-input
        v-model="email"
        class="mb-2 mr-sm-2 mb-sm-0"
        id="email"
        placeholder="E-mail"
      />
      <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          v-model="password"
          type="password"
          id="password"
          placeholder="Password"
        />
      </b-input-group>
      <p>
        Not have account ?
        <router-link to="/register"><a>Register</a></router-link>
      </p>
      <b-button @click="onLogIn" variant="primary">Log In</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onLogIn: async function() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
        this.$emit('authChange')
      } catch (error) {
        alert('Your e-mail or password might be wrong!')
        console.log(error)
      }
    }
  }
}
</script>
