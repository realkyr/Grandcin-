<template>
  <div class="main">
    <Navbar />
    <b-container>
      <b-row>
        <b-col cols="12">
          <LogInForm @authChage="$router.push({ path: '/' })" />
          <!-- on authChange is event listener 
            there is a function in login form component will trigger this
            event after user login
            -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import LogInForm from '../components/LogInForm.vue'

export default {
  components: {
    Navbar,
    LogInForm
  }
}
</script>

<style scoped>
b-row {
  align-content: center;
}
.main {
  background-color: white;
}
</style>
