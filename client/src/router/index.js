import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Home from "../pages/Home.vue";
import CreatePost from "../pages/CreatePost.vue";
import PostDetail from "../pages/PostDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/create",
    name: "CreatePost",
    component: CreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: PostDetail,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 AUTH GUARD (Vue Router v4 correct style)
router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  // if route requires auth and no token → redirect login
  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  // otherwise allow navigation
  return true;
});

export default router;