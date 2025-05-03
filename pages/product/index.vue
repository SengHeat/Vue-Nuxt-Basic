<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFetch } from '#app';
import { useRouter } from 'vue-router';
const router = useRouter();

interface Task {
  id: number | null;
  feature: string;
  description: string;
  branch: string;
  commit: string;
  date: string;
  dateLine: string;
  status: string;
  priority: string;
  assignedTo: string;
  tags: string;
}

const { data, error, refresh, status } = await useFetch<Task[]>("http://localhost:8090/v1/api/tasks");

const selectedStatus = ref<string>('');
const selectedPriority = ref<string>('');
const selectedTask = ref<Task | null>(null);
const isModalOpen = ref(false);
const isEditMode = ref(false);
const searchQuery = ref('');
const isSidebarOpen = ref(false);
const formData = ref<Task>({
  id: null,
  feature: '',
  description: '',
  branch: '',
  commit: '',
  date: '',
  dateLine: "",
  status: '',
  priority: '',
  assignedTo: '',
  tags: '',
});

const mapTaskStatus = (status: string): string => {
  const statusMapping: { [key: string]: string } = {
    'IN_PROGRESS': '🛠',
    'COMPLETED': '✅',
    'READY_FOR_TESTING': '🧪',
    'BUG_FIXED': '🐞',
    'BLOCKED': '❌',
    'CLOSED': '🚫',
  };
  return statusMapping[status] || '🛠️';
};

const filteredData = ref<Task[]>([]);

watch([data, selectedStatus, selectedPriority, searchQuery], () => {
  filteredData.value = data.value.filter(task => {
    const statusMatch = selectedStatus.value ? task.status === selectedStatus.value : true;
    const priorityMatch = selectedPriority.value ? task.priority.toLowerCase() === selectedPriority.value.toLowerCase() : true;
    const searchMatch = searchQuery.value ?
        task.feature.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.tags.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.branch.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.date.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;
    return statusMatch && priorityMatch && searchMatch;
  });
}, { immediate: true });

const createTask = async () => {
  try {
    const response = await fetch("http://localhost:8090/v1/api/tasks", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const newTask = await response.json();
      data.value.push(newTask);
      closeModal();
    } else {
      alert('Failed to create task.');
    }
  } catch (error) {
    console.error("Create Error:", error);
    alert('Error creating task.');
  }
};

const editTask = async () => {
  try {
    if (!formData.value.id) {
      alert("Task ID is missing. Cannot update.");
      return;
    }

    const response = await fetch(`http://localhost:8090/v1/api/tasks/${formData.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      const updatedTask = contentType && contentType.includes('application/json')
          ? await response.json()
          : null;

      const index = data.value.findIndex(task => task.id === updatedTask?.id);
      if (index !== -1 && updatedTask) {
        data.value[index] = updatedTask;
      }
      closeModal();
    } else {
      const errorMessage = await response.text();
      console.error("Server error response:", errorMessage);
      throw new Error(`Failed to update task. Server responded with: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Edit Error:", error);
    alert(`Error editing task (ID: ${formData.value.id}): ${error.message || error}`);
  }
};

const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`http://localhost:8090/v1/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Check if taskId is valid and successfully removed
      data.value = data.value.filter(task => task.id !== taskId);
      alert('Task deleted successfully.');
    } else {
      // Read and log the error message from the server's response
      const errorMessage = await response.text();
      console.error("Server error response:", errorMessage);
      alert(`Failed to delete task: ${errorMessage}`);
    }
  } catch (error) {
    // Log and alert more detailed error information
    console.error("Delete Error:", error);
    alert(`Error deleting task: ${error.message || error}`);
  }
};

const goToDetail = (id: number) => {
  router.push(`/product/${id}`);
};

const openModal = (task?: Task) => {
  if (task) {
    selectedTask.value = task;
    formData.value = { ...task };
    isEditMode.value = true;
  } else {
    formData.value = {
      id: null,
      feature: '', description: '', branch: '', commit: '', date: '',
      status: '', priority: '', assignedTo: '', tags: ''
    };
    isEditMode.value = false;
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTask.value = null;
};
</script>


<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Mobile Sidebar Backdrop -->
    <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
        :class="[
        'fixed lg:relative z-50 bg-white shadow-md p-6 w-72 transition-transform duration-300 h-full',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <h2 class="text-2xl font-semibold text-indigo-600 mb-6">Filters</h2>
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Status</label>
        <select v-model="selectedStatus" class="w-full p-2 rounded border border-gray-300">
          <option value="">All</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="READY_FOR_TESTING">Ready for Testing</option>
          <option value="BUG_FIXED">Bug Fixed</option>
          <option value="BLOCKED">Blocked</option>
          <option value="CLOSED">Closed</option>
          <option value="HOTFIX">Hotfix</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Priority</label>
        <select v-model="selectedPriority" class="w-full p-2 rounded border border-gray-300">
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-600 mb-1">Search</label>
        <input type="text" v-model="searchQuery" placeholder="Search tasks..." class="w-full p-2 rounded border border-gray-300" />
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-100">
      <!-- Mobile menu toggle -->
      <button class="lg:hidden mb-4 text-indigo-600" @click="isSidebarOpen = !isSidebarOpen">
        ☰ Menu
      </button>

      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-700">📋 Task Manager</h1>
        <button @click="openModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow">
          + Create Task
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-auto rounded-lg shadow bg-white">
        <table class="w-full">
          <thead class="bg-indigo-600 text-white">
          <tr>
            <th class="text-left px-6 py-3">Feature</th>
            <th class="text-left px-6 py-3">Branch</th>
            <th class="text-left px-6 py-3">Commit</th>
            <th class="text-left px-6 py-3">Date</th>
            <th class="text-left px-6 py-3">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(task, index) in filteredData"
              :key="task.id"
              class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-4 flex items-center gap-2" @click="goToDetail(task.id ?? 0)">
              <span class="text-gray-500 font-semibold">{{ index + 1 }}.</span>
              <span>{{ mapTaskStatus(task.status)}}</span>
              <span class="ml-1 font-medium text-gray-800">{{ task.feature }}</span>
            </td>
            <td class="px-6 py-4">{{ task.branch }}</td>
            <td class="px-6 py-4">{{ task.commit }}</td>
            <td class="px-6 py-4">{{ task.date }}</td>
            <td class="px-6 py-4 flex gap-3">
              <button @click="openModal(task)" class="text-indigo-600 hover:underline">Edit</button>
              <button @click="deleteTask(task.id)" class="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <p v-if="filteredData.length === 0" class="text-center text-gray-500 p-6">No tasks found.</p>
      </div>
    </main>

    <!-- Modal -->
    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-semibold text-indigo-700 mb-6">{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>
        <form @submit.prevent="isEditMode ? editTask() : createTask()" class="space-y-4">
          <div v-for="field in ['feature', 'description', 'branch', 'commit', 'assignedTo', 'tags',]" :key="field">
            <label class="block text-sm font-medium text-gray-700 capitalize">{{ field }}</label>
            <input v-model="formData[field]" type="text" required class="w-full p-3 border rounded border-gray-300 focus:outline-indigo-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" v-model="formData.date" required class="w-full p-3 border rounded border-gray-300" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">DateLine</label>
            <input type="date" v-model="formData.dateLine" required class="w-full p-3 border rounded border-gray-300" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select v-model="formData.status" class="w-full p-3 border rounded border-gray-300">
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="READY_FOR_TESTING">Ready for Testing</option>
                <option value="BUG_FIXED">Bug Fixed</option>
                <option value="BLOCKED">Blocked</option>
                <option value="CLOSED">Closed</option>
                <option value="HOTFIX">Hotfix</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Priority</label>
              <select v-model="formData.priority" class="w-full p-3 border rounded border-gray-300">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 rounded bg-gray-300 text-gray-800">Cancel</button>
            <button type="submit" class="px-6 py-2 rounded bg-indigo-600 text-white">{{ isEditMode ? 'Update' : 'Create' }}</button>
            <button  @click="deleteTask(formData.id)" class="px-6 py-2 rounded bg-red-600 text-white">Delete</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
input, select, textarea {
  outline: none;
  border: 1px solid #ccc;
  transition: border 0.3s ease;
}
input:focus, select:focus, textarea:focus {
  border-color: #6366f1;
}
</style>

