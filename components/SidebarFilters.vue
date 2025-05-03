<template>
  <div class="flex">
    <!-- Sidebar with Filters -->

    <!-- Main Content (Task Table or Task Form) -->
    <div class="flex-1 p-6">
      <!-- Task Table or Task List -->
      <TaskTable :tasks="filteredTasks" />

      <!-- Task Form (optional) -->
      <TaskForm
          :isEdit="isEdit"
          :taskForm="taskForm"
          :createTask="createTask"
          :updateTask="updateTask"
          :closeTaskForm="closeTaskForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskTable from './TaskTable.vue'
import TaskForm from './TaskForm.vue'

const filters = ref({
  status: ''
})

const tasks = ref([
  { id: 1, feature: 'Product Filtering', status: '✅ Completed', description: 'Filter tasks by status', branch: 'feature/filtering-ui' },
  { id: 2, feature: 'Bug Fixing', status: '🧪 Ready for Testing', description: 'Fix critical bug', branch: 'bugfix/critical' },
  // Add more tasks as needed
])

const filteredTasks = computed(() => {
  if (!filters.value.status) return tasks.value
  return tasks.value.filter(task => task.status === filters.value.status)
})

const isEdit = ref(false)
const taskForm = ref({
  id: null,
  feature: '',
  description: '',
  branch: '',
  commit: '',
  date: '',
  status: '✅ Completed',
  priority: 'High',
  assignedTo: '',
  tags: ''
})

// Create a new task
const createTask = async () => {
  tasks.value.push({ ...taskForm.value, id: tasks.value.length + 1 })
  closeTaskForm()
}

// Update an existing task
const updateTask = async () => {
  const taskIndex = tasks.value.findIndex(task => task.id === taskForm.value.id)
  if (taskIndex !== -1) {
    tasks.value[taskIndex] = { ...taskForm.value }
  }
  closeTaskForm()
}

// Close task form
const closeTaskForm = () => {
  taskForm.value = { id: null, feature: '', description: '', branch: '', commit: '', date: '', status: '✅ Completed', priority: 'High', assignedTo: '', tags: '' }
  isEdit.value = false
}

// Open task creation form
const openCreateForm = () => {
  taskForm.value = { id: null, feature: '', description: '', branch: '', commit: '', date: '', status: '✅ Completed', priority: 'High', assignedTo: '', tags: '' }
  isEdit.value = false
}
</script>

<style scoped>
/* Your styles for the parent component */
</style>
