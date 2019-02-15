<template>
  <div>
    <Navbar />
    <LogInForm @authChage="$router.push({ path: '/' })" />
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
