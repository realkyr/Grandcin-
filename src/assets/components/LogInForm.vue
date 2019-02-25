<template>
  <div>
    <div class="form-group border rounded border-warning bg-secondary"
      style="padding: 5em;">
      <b-form>
        <!-- inline -->
        <label class="sr-only" for="inlineFormInputName2">Name</label>
        <center>
          <b-navbar-brand to="/" class="text-warning">GrandCiné</b-navbar-brand>
        </center>
        <br />
        <b-input
          v-model="email"
          class="mb-2 mr-sm-2 mb-sm-0"
          id="email"
          placeholder="E-mail"
        />
        <br />
        <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
          />
        </b-input-group>
        <br />
        <center>
          <p class="text-warning">
            Not have account ?
            <router-link class="text-danger" to="/register">
              <a>Register</a>
            </router-link>
          </p>
        </center>
        <center>
          <b-button @click="onLogIn" variant="warning">Log In</b-button>
        </center>
      </b-form>
    </div>
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
      // just login trigger event authChange when finish
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
        this.$emit('authChange')
      } catch (error) {
        alert('Your E-mail or password might be wrong!')
        console.log(error)
      }
    }
  }
}
</script>
