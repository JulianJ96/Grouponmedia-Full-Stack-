<template>
  <div id="main">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white pt-0 pb-0">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand me-0" to="/dashboard">
            <img src="./assets/Groupomania-Logos/icon-left-font-monochrome-black.svg" alt="Grupomania">
          </router-link> 
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div class="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isdashboardPage()" to="/dashboard">{{user.firstname+' '+user.lastname}}</router-link> 
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isauth()" to="/"> Sign In </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isauth()" to="/signup"> Sign Up </router-link> 
            </li>
            <li class="nav-item">
              <router-link class="nav-link" v-if="!isdashboardPage()" to="/profile"> Profile </router-link> 
            </li>
            <li id="notification" v-if="notification()" class="nav-item bg-secondary rounded-pill">
              <router-link class="nav-link" v-if="!isdashboardPage()" to="/dashboard"> Inbox 
                <span v-if="user.post_unread" >
                  {{user.post_unread}}
                </span>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link @click="logout()" class="nav-link" v-if="!isdashboardPage()" to="/">Log out </router-link> 
            </li>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div> 
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  mounted() {
    const user = localStorage.getItem('userId');
    if (user) {
      this.user.user = localStorage.getItem('userId');
      this.user.token = localStorage.getItem('token');
      this.user.idComment = localStorage.getItem('idComment');
      this.user.id = localStorage.getItem('id');
      this.user.post_unread = localStorage.getItem('unread');
      let data1 = localStorage.getItem('id');
      let url = "http://localhost:3000/api/auth/user/" + data1;
      this.$http.get(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        params: {
          'userId': this.user.id
        }
      }).then(response => {
        this.user.firstname = response.data.firstname;
        this.user.lastname = response.data.lastname;
        this.$router.push(this.$route.path);
      }).catch(error => {
        answer.innerHTML = error;
      });
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user
    })
  },
  methods: {
    notification() {
      if (this.user.post_unread >= 1) {
        return true;
      } else {
        return false;
      }
    },
    isdashboardPage() {
      if (this.$route.path === '/' || this.$route.path === '/signup') {
        return true;
      } else {
        return false;
      }
    },
    inbox() {
      if (this.$route.path === '/' || this.$route.path === '/signup') {
        return true;
      } else {
        return false;
      }
    },
    isauth() {
      if (this.user.user !== "" || this.user.token !== "") {
        return true;
      } else {
        return false;
      }
    },
    logout() {
      //sessionStorage.clear();
      localStorage.removeItem('id');
      localStorage.removeItem('unread');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      this.$store.commit('clear');
      this.$router.push('/');
    }
  }
};
</script>


<style lang="scss">
html {
    height: 100%;
}
body {
    height: 100%;
}
#main {
    height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fixed-top .navbar-collapse {
  max-height: 340px;
  overflow-y: auto;
}
</style>
