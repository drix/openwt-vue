<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Boat msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Boat from '@/components/Boat.vue'

export default {
  name: 'Home',
  components: {
    Boat
  }
}
</script>
