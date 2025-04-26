
<template>
  <footer class="w-full bg-gray-100 dark:bg-gray-900 text-center text-sm text-gray-500 dark:text-gray-400 py-6">
    <div class="container mx-auto px-4">
      <p>&copy; {{ new Date().getFullYear() }} Seng Heat. All rights reserved.</p>
      <div class="mt-2 space-x-4">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
      </div>
    </div>
  </footer>
</template>