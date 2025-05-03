<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
    <div class="bg-white w-full max-w-md p-4 rounded-lg transition-transform transform">
      <h2 class="text-xl font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this task?</p>
      <div class="flex justify-between space-x-2 mt-4">
        <button @click="$emit('confirm')" class="w-full bg-red-500 text-white py-2 rounded">Yes, Delete</button>
        <button @click="$emit('cancel')" class="w-full bg-gray-500 text-white py-2 rounded">Cancel</button>
      </div>
    </div>
  </div>
</template>