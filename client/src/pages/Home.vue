<template>
  <div>
    <h2>All Posts</h2>

    <button @click="$router.push('/create')">Create Post</button>
    <button @click="logout">Logout</button>

    <div v-for="post in posts" :key="post._id">
      <h3 @click="goTo(post._id)">{{ post.title }}</h3>
      <p>by {{ post.author?.username }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../services/api";
import { useRouter } from "vue-router";

const posts = ref([]);
const router = useRouter();

const fetchPosts = async () => {
  const res = await API.get("/posts");
  posts.value = res.data;
};

const goTo = (id) => {
  router.push(`/post/${id}`);
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(fetchPosts);
</script>