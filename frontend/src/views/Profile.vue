<template>
  <div id="main" class="bg-secondary bg-gradient mt-body">
    <!-- <img alt="Vue logo" src="../assets/icon.png">-->
    <ProfileUser msg="Welcome to Your Grupomania Network"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProfileUser from '../components/ProfileUser.vue'
export default {
  name: 'Profile',
  components: {
    ProfileUser
  }
}
</script>
<style lang="scss">
html {
    height: 100%;
}
body {
    height: 100%;
}
</style>