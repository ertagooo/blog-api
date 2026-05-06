<template>
  <nav class="navbar">
    <h2 @click="goHome">Blog App</h2>

    <div class="links">
      <button v-if="!token" @click="goLogin">Login</button>
      <button v-if="!token" @click="goRegister">Register</button>

      <button v-if="token" @click="goCreate">Create Post</button>
      <button v-if="token" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const token = localStorage.getItem("token");

const goHome = () => router.push("/");
const goLogin = () => router.push("/login");
const goRegister = () => router.push("/register");
const goCreate = () => router.push("/create");

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
  window.location.reload(); // refresh UI state
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #222;
  color: white;
  align-items: center;
}

.links button {
  margin-left: 10px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>