<template>
    <div id = "main" class= "bg-secondary bg-gradient mt-body">
        <!-- <img alt = "Vue Logo" src = "../assets/Grouponmania-logos/icon.png">-->
        <LogIn msg ="Welcome to your Social Network"/>

    </div>
</template>

<script>
// @ is an alias to /src
import LogIn from '../components/Login.vue'

export default {
    name: 'SignIn',
    components: {
        LogIn
    }
}
</script>
<style lang = "scss">

@import '../assets/main.css';
html{
    height: 100%;
}
body{
    height: 100%;
}

</style>
