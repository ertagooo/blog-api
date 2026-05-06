<template>
  <div>
    <h2>Register</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="register">Register</button>

    <p @click="$router.push('/login')">Go to Login</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";
import { useRouter } from "vue-router";

const email = ref("");
const username = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    await API.post("/users/register", {
      email: email.value,
      username: username.value,
      password: password.value
    });

    router.push("/login");
  } catch (err) {
    alert("Register failed");
  }
};
</script>