<template>
  <div class="container">
    <h1 class="title">My Blog</h1>
    <div class="posts">
      <div v-for="post in posts" :key="post.slug">
        <h2><a :href="`/posts/${post.slug}`">{{ post.title }}</a></h2>
        <p>{{ post.date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData() {
    const url = 'http://localhost:3000/api/posts';
    console.log('Fetching posts from:', url);
    try {
      const { data } = await axios.get(url);
      console.log('Fetched posts:', data); // Log to verify fetched data
      return { posts: data };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { posts: [] };
    }
  },
};
</script>

<style scoped>
.container {
  margin: 2rem;
}
.posts {
  margin: 2rem 0;
}
</style>
