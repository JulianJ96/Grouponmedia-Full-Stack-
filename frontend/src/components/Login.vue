<template>
  <div id="main">
    <h1>{{ msg }}</h1>
    <main class="form-signin">
      <img class="mb-4 img-fluid" src= "../assets/Groupomania-Logos/icon-left-font-monochrome-white.svg" alt="Grouponmania">
      <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="username" required>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
          <label for="floatingPassword">Password</label>
        </div>
        <div class="checkbox mb-3">
          <button class="w-100 btn btn-lg btn-primary" type="submit" @click="SignInUser">Sign In</button>
        </div>
        <div class="checkbox mb-3">
          <button class="w-100 btn btn-lg btn-primary" type="submit"  @click="SignUpUser">Sign Up</button>
        </div>
        <p class="mt-5 mb-3 alert-danger" id="response" ></p>
        <p class="mt-5 mb-3 text-muted">&copy; 2023-2024</p>
      </form>
    </main>
  </div>
</template>

<script>
//import axios from "axios";
//import { AUTH_REQUEST } from "../auth/actions/auth";
import { mapState } from 'vuex/dist/vuex.esm-bundler.js';


export default {
  name: 'SaveUser',
  data() {
    return {
      username: "",
      password: "",
    };
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    SignUpUser(event) { 
      event.preventDefault()
      this.$router.push('/signup')
    },
    SignInUser(event) {
      event.preventDefault() 
      let answer = document.getElementById("response"); 
      if (this.username != "" && this.password != "") {
        let url = "http://localhost:3000/api/auth/login"
        let data1 = {
          email : this.username,
          password : this.password,
        }
        this.$http.post(url,data1).then(response => {
          this.$store.commit('login',response); 
          this.$router.push('/dashboard')
        }).catch(error => {
          answer.innerHTML =  error.response.data.message;
        });
      }else{
        answer.innerHTML =  "Please fill the fields in order to sign in";
      }
    },
  }
}
</script>


<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  html,
  body {
    height: 100%;
  }
  body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-floating:focus-within {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>
