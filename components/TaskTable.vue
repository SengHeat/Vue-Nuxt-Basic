<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow-md">
    <table class="w-full table-auto">
      <thead class="bg-gray-200">
      <tr>
        <th class="px-4 py-2 text-left">Feature</th>
        <th class="px-4 py-2 text-left">Status</th>
        <th class="px-4 py-2 text-left">Branch</th>
        <th class="px-4 py-2 text-left">Priority</th>
        <th class="px-4 py-2 text-left">Assigned To</th>
        <th class="px-4 py-2 text-left">Date</th>
        <th class="px-4 py-2 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td class="px-4 py-2">{{ task.feature }}</td>
        <td class="px-4 py-2">{{ task.status }}</td>
        <td class="px-4 py-2">{{ task.branch }}</td>
        <td class="px-4 py-2">{{ task.priority }}</td>
        <td class="px-4 py-2">{{ task.assignedTo }}</td>
        <td class="px-4 py-2">{{ task.date }}</td>
        <td class="px-4 py-2 space-x-2">
          <button @click="$emit('view', task)" class="text-blue-500 hover:underline">View</button>
          <button @click="$emit('edit', task)" class="text-green-500 hover:underline">Edit</button>
          <button @click="$emit('delete', task.id)" class="text-red-500 hover:underline">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tasks: {
    id: number;
    feature: string;
    description: string;
    branch: string;
    commit: string;
    date: string;
    status: string;
    priority: string;
    assignedTo: string;
    tags: string;
  }[];
}>()
</script>

<style scoped lang="postcss">
/* Add your custom styles here if needed */
</style>
