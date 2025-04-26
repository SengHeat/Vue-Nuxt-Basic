<script setup lang="ts">
const { data: user, error } = useFetch('https://api.github.com/users/mshenoy')
</script>

<template>
  <h1>{{user?.name}}</h1>
  <h1>{{user?.blog}}</h1>
  <h1>{{user?.bio}}</h1>
</template>

<style scoped>

</style>