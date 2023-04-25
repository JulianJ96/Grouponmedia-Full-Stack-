<template>
  <div class="hello">
    <h1> {{ msg }} </h1>

    <main class= "form-signin">
      <form>
        <img class="mb-4" src= '../assets/Groupomania-Logos/icon.png' alt="" width="72" height="72">

        <h1 class="h3 mb-3 fw-normal"> Please Sign In!</h1>

        <div class="form-floating">
          <input oninvalid= "this.setCustomValidity('Please fill out your email')" type= "email" class= "form-control" id= "validationDefaultUsername" placeholder="name@example.com" v-model="formdata.username" required>
          <label for="validationDefaultUsername"> Email Address</label>
        </div>
        <div class="form-floating">
          <input oninvalid= "this.setCustomValidity('Please fill out your first name')" type= "text" class= "form-control text-uppercase" id= "validationfirst" placeholder="Eren" v-model="formdata.firstname" required>
          <label for="validationfirst"> First Name</label>
        </div>
         <div class="form-floating">
          <input oninvalid= "this.setCustomValidity('Please fill out your last name')" type= "text" class= "form-control text-uppercase" id= "validationlast" placeholder="Yeager" v-model="formdata.lastname" required>
          <label for="validationlast"> Last Name</label>
        </div>
        <div class="form-floating">
          <input type="text" id="validationphone" placeholder="1111111111" v-model="formdata.phone" required>
          <label for="validationphone">Phone Number</label>
        </div>
        <div class="form-floating">
          <input type="password" id="validationpassword" placeholder="password" v-model="formdata.password" required>
          <label for="validationpassword">password</label>
        </div>
        <div class="form-floating">
          <input type="password" id="validationpassword2" placeholder="password confirmation" v-model="formdata.password_confirmation" required>
          <label for="validationpassword2">Password confirmation</label>
        </div>
        <!--
          <div class="checkbox mb-3">
            <label>
              <input type= "checkbox" value= "remember-me"> Remember me
            </label>
          </div>
        -->
        <div class="checkbox mb-3 mt-4">
          <button class="w-100 btn btn-lg btn-primary" type="button" @click="submit"> Sign Up</button>
        </div>

        <p class="mt-5 mb-3 alert-danger" id="answer"></p>
        <p class="mt-5 mb-3 text-muted">&copy;2 023-2024</p> 
      </form>
    </main>
  </div>
</template>

<script>
// import { VueTelInput } from 'vue3-tel-input
// import 'vue3-tel-input/dist/vue3-tel-input.css;
import { mapState } from 'vuex/dist/vuex.esm-bundler.js';


import {checkPhoneNumber, checkPassword, modifyArray, exitsUser } from '../../../backend/js/script';
// import axios from "axios";
export default {
  // components: { VueTelInput },
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
    submit(){
      let checkPass = script.checkPassword(this.formdata.password);
      let checkPhone = script.checkPhoneNumber(this.formdata.phone);
      let answer = document.getElementById("answer");
      if(this.formdata.firstname === "" && this.formdata.lastname === ""&&this.formdata.phone === "" && this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username ===""){
        this.formdata.password = ""
        this.formdata.password_confirmation = ""
        answer.innerHTML = "Please enter all fields";
      }
      else if (this.formdata.password === "" && this.formdata.password_confirmation === "" && this.formdata.username !=""){
        answer.innerHTML = "Please enter passwords";
      }
      else if(this.formdata.password !== this.formdata.password_confirmation){
        answer.innerHTML = "Please both passwords must be equal";
      }
      else if (this.formdata.password === this.formdata.password_confirmation && checkPass['conditional'] && checkPhone['conditonal'] && this.formdata.username !="" && this.formdata.lastname !=""){
        let url = "http://localhost:3000/api/auth/signup";
        let data1 = {
          email: this.formdata.username,
          password: this.formdata.password,
          firstname: this.formdata.firstname.toUpperCase(),
          lastname: this.formdata.lastname.toUpperCase(),
          phonenumber: this.formdata.phone,
        }

        const value = script.checkPassword(this.formdata.password);
        if(checkPass['conditional'] && checkPhone['conditional']){
          this.$http.post(url,data1).then(response => {
            answer.innerHTML = response.data;
            this.$store.commit('login', response);
            if(response.status === 201){
              this.$router.push('/dashboard')
            }
          })
          .catch(error => {
            answer.innerHTML = error.response.data.message;
          });
        } else{
          answer.innerHTML = value.message
        }
      } else{
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
.background_read{
background-color:white;
}
.background_not_read{
background-color: #f1eeed;
  
}
</style>