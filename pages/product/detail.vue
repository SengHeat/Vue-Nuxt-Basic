<template>
  <div :class="[$pinia.ui.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900', 'min-h-screen flex']">
    <!-- Sidebar -->
    <aside
        :class="[
        'w-72 p-6 bg-white dark:bg-gray-800 shadow-lg fixed z-50 h-full transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:block'
      ]"
    >
      <h2 class="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">Filters</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm">Status</label>
          <select v-model="filters.status" class="w-full p-2 rounded border">
            <option value="">All</option>
            <option v-for="option in statusOptions" :key="option" :value="option">{{ formatStatus(option) }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm">Priority</label>
          <select v-model="filters.priority" class="w-full p-2 rounded border">
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label class="block text-sm">Search</label>
          <input v-model="filters.search" type="text" class="w-full p-2 rounded border" placeholder="Search..." />
        </div>
        <div class="mt-4">
          <button @click="toggleDarkMode" class="px-4 py-2 rounded bg-indigo-600 text-white w-full">
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-4 md:ml-72">
      <div class="flex justify-between items-center mb-4">
        <button @click="toggleSidebar" class="md:hidden px-4 py-2 bg-indigo-600 text-white rounded">☰</button>
        <h1 class="text-3xl font-bold">📋 Tasks</h1>
        <button @click="openModal" class="bg-indigo-600 text-white px-4 py-2 rounded">+ New Task</button>
      </div>

      <div class="overflow-auto bg-white dark:bg-gray-800 rounded shadow">
        <table class="w-full table-auto">
          <thead class="bg-indigo-600 text-white">
          <tr>
            <th class="px-4 py-2 text-left">Feature</th>
            <th class="px-4 py-2 text-left">Branch</th>
            <th class="px-4 py-2 text-left">Commit</th>
            <th class="px-4 py-2 text-left">Date</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in paginatedTasks" :key="task.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-4 py-2">{{ task.feature }}</td>
            <td class="px-4 py-2">{{ task.branch }}</td>
            <td class="px-4 py-2">{{ task.commit }}</td>
            <td class="px-4 py-2">{{ task.date }}</td>
            <td class="px-4 py-2 space-x-2">
              <button @click="openModal(task)" class="text-indigo-600">Edit</button>
              <button @click="deleteTask(task.id)" class="text-red-600">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="p-4 text-sm flex justify-between items-center">
          <span>Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredTasks.length }}</span>
          <div class="space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-2 py-1 bg-gray-300 rounded">Prev</button>
            <button @click="nextPage" :disabled="endIndex >= filteredTasks.length" class="px-2 py-1 bg-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>

      <!-- Modal code omitted for brevity, reuse yours -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useUIStore } from '@/stores/uiStore'

const $pinia = {
  tasks: useTaskStore(),
  ui: useUIStore()
}

const sidebarOpen = ref(false)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
const toggleDarkMode = () => $pinia.ui.toggleDarkMode()

const filters = ref({ status: '', priority: '', search: '' })
const statusOptions = ['IN_PROGRESS', 'COMPLETED', 'READY_FOR_TESTING', 'BUG_FIXED', 'BLOCKED', 'CLOSED', 'HOTFIX']

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    IN_PROGRESS: 'In Progress', COMPLETED: 'Completed', READY_FOR_TESTING: 'Ready for Testing',
    BUG_FIXED: 'Bug Fixed', BLOCKED: 'Blocked', CLOSED: 'Closed', HOTFIX: 'Hotfix'
  }
  return map[status] || status
}

const filteredTasks = computed(() => {
  return $pinia.tasks.tasks.filter(task => {
    const statusMatch = filters.value.status ? task.status === filters.value.status : true
    const priorityMatch = filters.value.priority ? task.priority === filters.value.priority : true
    const searchMatch = filters.value.search ?
        task.feature.toLowerCase().includes(filters.value.search.toLowerCase()) : true
    return statusMatch && priorityMatch && searchMatch
  })
})

const currentPage = ref(1)
const pageSize = 5
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, filteredTasks.value.length))

const paginatedTasks = computed(() => {
  return filteredTasks.value.slice(startIndex.value, endIndex.value)
})

const nextPage = () => {
  if (endIndex.value < filteredTasks.value.length) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
