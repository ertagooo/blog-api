<template>
  <div>
    <h2>Create Post</h2>

    <input v-model="title" placeholder="Title" />
    <textarea v-model="content" placeholder="Content"></textarea>

    <button @click="createPost">Submit</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "../services/api";
import { useRouter } from "vue-router";

const title = ref("");
const content = ref("");
const router = useRouter();

const createPost = async () => {
  try {
    await API.post("/posts", {
      title: title.value,
      content: content.value
    });

    router.push("/");
  } catch (err) {
    alert("Error creating post");
  }
};
</script>