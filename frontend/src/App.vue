<script setup>
import { ref } from 'vue';
import CommentSection from './components/CommentSection.vue';

const HOST_NAME = `${import.meta.env.VITE_API_URL}` || 'http://localhost';

const userId = ref('');
const users = ref(null);
const newEmail = ref('');

const getUser = async () => {
  const response = await fetch(`${HOST_NAME}/hafizh/api/user/${userId.value}`);
  // const response = await fetch(`http://localhost:3000/api/user/${userId.value}`);
  users.value = await response.json();
};

const changeEmail = async () => {
    // await fetch('http://localhost:3000/api/change-email', {
  await fetch(`${HOST_NAME}/hafizh/api/user/${userId.value}/change-email` , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email: newEmail.value }).toString(),
    // body: `email=${newEmail.value}`,
  });
};
</script>

<template>
  <div id="app">
    <h1>User Dashboard</h1>
    <div>
      <input type="number" v-model="userId" placeholder="Enter User ID" />
      <!-- <input v-model="userId" placeholder="Enter User ID" /> -->
      <button @click="getUser">Get User Info</button>
    </div>
    <div v-if="users">
      <template v-for="user in users">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <hr />
      </template>
    </div>
    <CommentSection />
    <form @submit.prevent="changeEmail">
      <h3>Change Email</h3>
      <input type="email" v-model="newEmail" placeholder="New Email" />
      <!-- <input v-model="newEmail" placeholder="New Email" /> -->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
