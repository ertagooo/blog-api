<template>
  <div>
    <h2>Login</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login">Login</button>

    <p @click="$router.push('/register')">Go to Register</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await API.post("/users/login", {
      email: email.value,
      password: password.value
    });

    localStorage.setItem("token", res.data.token);
    router.push("/");
  } catch (err) {
    alert("Login failed");
  }
};
</script>