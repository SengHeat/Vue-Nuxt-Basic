<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <h1> User Page {{route.params.id}}</h1>
  <p>{{ route.query.search}}</p>
  <NuxtLink to="/users/view-all">View All</NuxtLink>
</template>