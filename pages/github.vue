<script setup lang="ts">
const { data: users, error } = await useFetch('https://api.github.com/users')
</script>

<template>
  <h1>GitHub user</h1>
  <div v-for="user in users">
    <h2 class="text-center font-extra-small">{{ user.login }}</h2>
  </div>
</template>

<style scoped>

</style>