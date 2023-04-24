// import VueRouter from 'vue-router'
//import SignIn from '../views/SignIn.vue
//import Vue from './../App.vue'



import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
//import store '../auth/store'
import SignIn from '../views/SignIn.vue'
import Profile from '../views/Profile.vue'
import store from '../auth/store'

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/Register.vue')
  
  },
  {
    path: '/replies',
    name: 'Replies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/RepliesPosts.vue')
  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.getUser;

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router
