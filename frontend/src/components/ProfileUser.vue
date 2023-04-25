<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
<main class="form-user">
  <img class="mb-4" src="../assets/Groupomania-Logos/icon.png" alt="" width="72" height="72">
    
  <form class="row g-6" @submit.prevent="submit">
  <div class="col-md-6">
    <label for="validationDefault01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationDefault01" v-model="firstname" required>
  </div>
  <div class="col-md-6">
    <label for="validationDefault02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationDefault02" v-model="lastname" required>
  </div>
  <div class="col-md-6">
    <label for="validationDefault02" class="form-label">Email address</label>
      <input type="email" class="form-control" id="floatingInput" v-model="mask" >
  </div>
  <div class="col-md-6">
     <label for="validationDefault02" class="form-label">Phone Number</label>
     <input  type="tel" class="form-control" id="floatingInput" placeholder="(111) 111-1111" v-model="phonenumber" required>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
      <label class="form-check-label" for="invalidCheck2">
        Agree to terms and conditions to delete my account
      </label>
    </div>
  </div>
  <div class="col-12">
    <button class="w-100 btn btn-lg btn-primary" type="submit">Delete</button>
  </div>
</form>
    <p class="mt-5 mb-3 alert-danger" id="answer"></p>
    <p class="mt-5 mb-3 text-muted">&copy; 2020–2021</p>

</main>

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { mapState } from 'vuex/dist/vuex.esm-bundler.js';

import axios from 'axios'

export default defineComponent({
  name: 'SaveUser',
  components: { VueTelInput },
  data() {
    return {
      mask: '',
      username: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      answer: ''
    }
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
    GetUser() {
      const user = this.user.user
      let answer = document.getElementById('answer')
      let url = `http://localhost:3000/api/auth/user/${this.user.id}`
      axios
        .get(url, {
          headers: { Authorization: this.user.token },
          params: { userId: this.user.id }
        })
        .then((response) => {
          this.username = response.data.email
          var user = response.data.email
          this.mask = user.replace(/^(.)(.*)(.com.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c)
          this.firstname = response.data.firstname
          this.lastname = response.data.lastname
          this.phonenumber = response.data.phonenumber
        })
        .catch((error) => {
          answer.classList.remove('alert-success')
          answer.classList.add('alert-danger')
          answer.innerHTML = error.response.data.message
        })
    },
    submit(e) {
      e.preventDefault()
      const user = this.user.user
      let url = `http://localhost:3000/api/auth/deleteuser/${user}`
      let answer = document.getElementById('answer')
      axios
        .delete(url, { headers: { Authorization: this.user.token } })
        .then((response) => {
          this.$router.push('/')
          answer.innerHTML = response.data.message
        })
        .catch((error) => {
          if (!error.response.data.message) answer.classList.remove('alert-success')
          answer.classList.add('alert-danger')
          answer.innerHTML = error.response.data.message
        })
    }
  },
  beforeMount() {
    this.GetUser()
  }
})
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.form-user {
  width: 100%;
  max-width: 50%;
  padding: 15px;
  margin: auto;
}
.form-user .checkbox {
  font-weight: 400;
}
.form-user .form-floating:focus-within {
  z-index: 2;
}
.form-user input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-user input[type="password"] {
  margin-bottom: 0px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
#floatingPassword2 {
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