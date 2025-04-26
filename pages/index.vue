<script setup lang="ts">
useHead({
  title: 'Home Page',
  script: ['main.js'],
  meta: [{name: 'description', content: 'Home Page Using Nuxt3'}]
});

const { data: message } = await useFetch('/api/user-detail')
</script>

<template>
  <h1>My name is: Seng Heat</h1>
  <h1>Skill: Flutter Laravel Vue</h1>
  <h1>Hello World</h1>
  <h1>{{message?.message}}</h1>
  <NuxtLink to="/about">Go to About Page</NuxtLink>
</template>

<style scoped>

</style>