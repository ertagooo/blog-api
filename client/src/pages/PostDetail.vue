<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>by {{ post.author?.username }}</p>

    <button @click="deletePost">Delete</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../services/api";
import { useRoute, useRouter } from "vue-router";

const post = ref(null);
const route = useRoute();
const router = useRouter();

const fetchPost = async () => {
  const res = await API.get(`/posts/${route.params.id}`);
  post.value = res.data;
};

const deletePost = async () => {
  try {
    await API.delete(`/posts/${route.params.id}`);
    router.push("/");
  } catch (err) {
    alert("Not allowed or error");
  }
};

onMounted(fetchPost);
</script>