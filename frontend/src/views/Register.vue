<template>
    <div id= "main" class ="bg-secondary bg-gradient mt-body">
        <SignUp msg ="Welcome to Grouponmania Network"/>
    </div>
</template>

<script>
import SignUp from '../components/SignUp.vue'

export default {
    name: 'Register',
    components: {
        SignUp
    }
}
</script>

<style lang = "scss">
html {
    height: 100%;
}
body {
    height: 100%;
}
</style>
