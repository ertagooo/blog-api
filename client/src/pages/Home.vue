<template>
  <div>
    <h2>All Posts</h2>

    <button @click="$router.push('/create')">Create Post</button>
    <button @click="logout">Logout</button>

    <div v-for="post in posts" :key="post._id" class="post">
      <h3 @click="goTo(post._id)">{{ post.title }}</h3>

      <!-- ✅ FIX: show content -->
      <p>{{ post.content }}</p>

      <small>by {{ post.author?.username }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../services/api";
import { useRouter } from "vue-router";

const posts = ref([]);
const router = useRouter();

/* =========================
   FETCH ALL POSTS
========================= */
const fetchPosts = async () => {
  try {
    const res = await API.get("/posts");
    posts.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Failed to load posts");
  }
};

/* =========================
   GO TO SINGLE POST
========================= */
const goTo = (id) => {
  router.push(`/post/${id}`);
};

/* =========================
   LOGOUT
========================= */
const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

onMounted(fetchPosts);
</script>