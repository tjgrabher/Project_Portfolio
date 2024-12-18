<template>
    <div class="container">
      <h1 v-if="post" class="title">{{ post.title }}</h1>
      <div v-if="post" v-html="post.content"></div>
      <div v-else>
        <p>Sorry, the post could not be found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    async asyncData({ params }) {
      try {
        const url = `http://localhost:3000/api/posts/${params.slug}`;
        console.log('Fetching post from:', url);
        const { data } = await axios.get(url);
        console.log('Fetched post:', data); // Log to verify fetched data
        return { post: data };
      } catch (error) {
        console.error('Error fetching post:', error);
        return { post: null };
      }
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 2rem;
  }
  </style>
  