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
export default {
  name: "SignUp",
  data() {
    return {
      // your component's data properties go here
    };
  },
  methods: {
    // your component's methods go here
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