<template>
  <div>
    <Navbar />
    <LogInForm @authChage="$router.push({ path: '/' })" />
    <!-- on authChange is event listener 
      there is a function in login form component will trigger this
      event after user login
     -->
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
