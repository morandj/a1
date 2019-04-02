import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Home from "@/views/Home.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import NewHunt from "@/views/NewHunt.vue";
import EditHunt from "@/views/EditHunt.vue";
import Settings from "@/views/Settings.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: {
        // requiresAuth: true
        requiresAuth: false
      }
    },
    {
      path: "/newhunt",
      name: "newhunt",
      component: NewHunt,
      meta: {
        // requiresAuth: true
        requiresAuth: true
      }
    },
    {
      path: "/edithunt/:id",
      name: "edithunt",
      component: EditHunt,
      meta: {
        // requiresAuth: true
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      meta: {
        // requiresAuth: true
        requiresAuth: false
      }
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log("beforeEach");
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  // console.log(requiresAuth, currentUser);

  if (requiresAuth && !currentUser) {
    next("/signin");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
