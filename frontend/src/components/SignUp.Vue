<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <main class="form-signin">
      <form>
        <img class="mb-4" src="../assets/Groupomania-Logos/icon.png" alt="" width="72" height="72">

        <h1 class="h3 mb-3 fw-normal">Please Sign In!</h1>

        <div class="form-floating">
          <input oninvalid="this.setCustomValidity('Please fill out your last name')" type="text" class="form-control text-uppercase" id="validationlast" placeholder="Yeager" v-model="formdata.lastname" required>
          <label for="validationlast">Last Name</label>
        </div>

        <div class="form-floating">
          <input oninvalid="this.setCustomValidity('Please fill out your first name')" type="text" class="form-control text-uppercase" id="validationfirst" placeholder="Eren" v-model="formdata.firstname" required>
          <label for="validationfirst">First Name</label>
        </div>

        <div class="form-floating">
          <input oninvalid="this.setCustomValidity('Please fill out your email')" type="email" class="form-control" id="validationDefaultUsername" placeholder="name@example.com" v-model="formdata.username" required>
          <label for="validationDefaultUsername">Email Address</label>
        </div>

        <div class="form-floating">
          <input type="text" id="validationphone" placeholder="phone number" v-model="formdata.phone" required>
        </div>

        <div class="form-floating">
          <input type="password" id="validationpassword" placeholder="password" v-model="formdata.password" required>
        </div>

        <div class="form-floating">
          <input type="password" id="validationpassword2" placeholder="password confirmation" v-model="formdata.password_confirmation" required>
        </div>

        <div class="checkbox mb-3 mt-4">
          <button class="w-100 btn btn-lg btn-primary" type="button" v-on:click="SignUpUser">Sign Up</button>
        </div>

        <p class="mt-5 mb-3 alert-danger" id="answer"></p>
        <p class="mt-5 mb-3 text-muted">&copy;2023-2024</p> 
      </form>
    </main>
  </div>
</template>


<script>
import { mapState } from 'vuex/dist/vuex.esm-bundler.js';
import { checkPhoneNumber, checkPassword } from '../../../backend/js/script.mjs';
import { modifyArray, exitsUser } from '../../../backend/js/script.mjs';
import axios from 'axios';
export default {
  name: "SaveUser",
  data() {
    return {
      formdata:{
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        password_confirmation: "",
        phone: "",
      },
      answer: ""
    };
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      namespaced: true,
      user: (state) => state.user
    })
  },
  methods: {
    SignUpUser() {
      let checkPass = checkPassword(this.formdata.password);
      let checkPhone = checkPhoneNumber(this.formdata.phone);
      let answer = document.getElementById("answer");
      if (this.formdata.firstname === "" && this.formdata.lastname === "" && this.formdata.phone === "" && this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username === "") {
        this.formdata.password = ""
        this.formdata.password_confirmation = ""
        answer.innerHTML = "Please enter all fields";
      } else if (this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username != "") {
        answer.innerHTML = "Please enter passwords";
      } else if (this.formdata.password !== this.formdata.password_confirmation) {
        answer.innerHTML = "Please both passwords must be equal";
      } else if (this.formdata.password === this.formdata.password_confirmation && checkPass['conditional'] && checkPhone['conditional'] && this.formdata.username != "" && this.formdata.lastname != "") {
        let url = "http://localhost:3000/api/auth/signup";
        let data = {
          email: this.formdata.username,
          password: this.formdata.password,
          firstname: this.formdata.firstname.toUpperCase(),
          lastname: this.formdata.lastname.toUpperCase(),
          phonenumber: this.formdata.phone,
        }
        const value = checkPassword(this.formdata.password);
        if (checkPass['conditional'] && checkPhone['conditional']) {
          axios.post(url, data)
            .then(response => {
              answer.innerHTML = response.data;
              this.$store.commit('login', response);
              if (response.status === 201) {
                // Redirect to dashboard upon successful sign up
                this.$router.push({ path: '/dashboard' });
              }
            })
            .catch(error => {
              answer.innerHTML = error.response.data.message;
            });
        } else {
          answer.innerHTML = value.message
        }
      } else {
        answer.innerHTML = checkPhone['message'];
      }
    }
  },
};
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
.margin_half {
  margin-right: 25% !important;
  margin-left: 25% !important;
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
  z-index: 1;
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
.background_read{
background-color:white;
}
.background_not_read{
background-color: #f1eeed;
  
}
</style>