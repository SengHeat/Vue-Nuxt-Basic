<template>
  <div>
    <!-- Button to open create form -->
    <button @click="openCreateForm" class="btn-submit">Create New Task</button>

    <!-- Task Form Component -->
    <TaskForm
        :isEdit="isEdit"
        :taskForm="taskForm"
        :createTask="createTask"
        :updateTask="updateTask"
        :closeTaskForm="closeTaskForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TaskForm from './TaskForm.vue'

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

// Function to open the form in 'create' mode
const openCreateForm = () => {
  isEdit.value = false
  taskForm.value = { id: null, feature: '', description: '', branch: '', commit: '', date: '', status: '✅ Completed', priority: 'High', assignedTo: '', tags: '' }
}

// Function to handle task creation
const createTask = async () => {
  // Send the data to the API for task creation
  console.log('Creating task', taskForm.value)
  // Reset form after creation
  openCreateForm()
}

// Function to handle task update
const updateTask = async () => {
  // Send the data to the API for updating the task
  console.log('Updating task', taskForm.value)
  // Reset form after update
  openCreateForm()
}

// Function to close the form
const closeTaskForm = () => {
  openCreateForm()
}
</script>

<style scoped>
/* Styles for the parent component, if needed */
</style>
