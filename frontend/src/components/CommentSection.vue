<script setup>
import { ref } from 'vue';
import DOMPurify from 'dompurify';

const comment = ref('');
const comments = ref('');

const sanitizeHtml = (inputHtml) => {
  return DOMPurify.sanitize(inputHtml);  
}

const submitComment = () => {
  comments.value += `<p>${sanitizeHtml(comment.value)}</p>`;
  comment.value = '';
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div v-html="comments"></div>
  </div>
</template>
