<script setup>
import { onMounted, ref } from 'vue';
import CommentSection from './components/CommentSection.vue';
import axios from "axios";
import DOMPurify from 'dompurify';

const HOST_NAME = `${import.meta.env.VITE_API_URL}` || 'http://localhost';

const userId = ref('');
const users = ref(null);
const newEmail = ref('');

const sanitizeHtml = (inputHtml) => {
  return DOMPurify.sanitize(inputHtml);  
}

const getUser = async () => {
  await axios.get(`${HOST_NAME}/api/user/${userId.value}`).then((response) => {
    users.value = response.data;
    console.log(response.data)
  });


};

const changeEmail = async () => {
  await axios.post(`${HOST_NAME}/api/user/${userId.value}/change-email`, {
      email: newEmail.value,
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
        <h2>{{ sanitizeHtml(user.name) }}</h2>
        <p>Email: {{ sanitizeHtml(user.email) }}</p>
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
