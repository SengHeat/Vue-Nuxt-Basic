<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAsyncData } from '#app';
import { ref } from 'vue';

interface Task {
  id: number;
  feature: string;
  description: string;
  branch: string;
  commit: string;
  date: string;
  dateLine: string;
  route: string;
  screenUi: string;
  status: string;
  priority: string;
  assignedTo: string;
  tags: string; // comma-separated
}

const route = useRoute();
const router = useRouter();
const taskId = route.params.id;

const {
  data: task,
  pending,
  error,
  refresh,
} = await useAsyncData<Task>(`task-${taskId}`, () =>
    $fetch(`http://localhost:8090/v1/api/tasks/${taskId}`)
);

const mapTaskStatus = (status: string): string => {
  const statusMapping: { [key: string]: string } = {
    'IN_PROGRESS': '🛠',
    'COMPLETED': '✅',
    'READY_FOR_TESTING': '🧪',
    'BUG_FIXED': '🐞🔥',
    'BLOCKED': '❌',
    'CLOSED': '🚫',
  };
  return statusMapping[status] || '🛠️';
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-all">

      <!-- 🧭 Header -->
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
            📝 Task #{{ task?.id }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Here are the juicy details 🕵️‍♂️</p>
        </div>
        <button
            @click="router.push('/product')"
            class="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← 🔙 Back
        </button>
      </div>

      <!-- ⏳ Loading -->
      <div v-if="pending" class="text-gray-500 dark:text-gray-300">
        ⏳ Loading task details...
      </div>

      <!-- ❌ Error -->
      <div v-else-if="error" class="text-red-500 dark:text-red-400 mt-4">
        ❌ Failed to load task. Please try again later.
      </div>

      <!-- ⚠️ Not Found -->
      <div v-else-if="!task" class="text-gray-600 dark:text-gray-300">
        ⚠️ Task not found.
      </div>

      <!-- ✅ Task Info -->
      <div v-else class="space-y-8">
        <!-- 🎯 Feature -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            🎯 {{ task.feature }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            🧾 {{ task.description }}
          </p>
        </div>

        <!-- 🧩 Meta Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">📌 Status</span>
            <div class="mt-1 inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-sm rounded-full px-3 py-1">
              <span>{{ mapTaskStatus(task.status) }}</span>
              <span class="capitalize">{{ task.status.replace(/_/g, ' ').toLowerCase() }}</span>
            </div>
          </div>

          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">🚦 Priority</span>
            <div class="mt-1">{{ task.priority }}</div>
          </div>

          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">👤 Assigned To</span>
            <div class="mt-1">{{ task.assignedTo }}</div>
          </div>

          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">📅 Date</span>
            <div class="mt-1">{{ task.date }},{{ task.dateLine }}</div>
          </div>

          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">🌿 Branch</span>
            <div class="mt-1">{{ task.branch }}</div>
          </div>

          <div>
            <span class="font-medium text-gray-500 dark:text-gray-400">🔐 Commit</span>
            <div class="mt-1 break-all">{{ task.commit }}</div>
          </div>
        </div>

        <!-- 🏷️ Tags -->
        <div>
          <span class="font-medium text-gray-500 dark:text-gray-400">🏷️ Tags</span>
          <div class="mt-2 flex flex-wrap gap-2">
            <span
                v-for="tag in task.tags.split(',')"
                :key="tag"
                class="bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white text-xs px-3 py-1 rounded-full"
            >
              🔖 {{ tag.trim() }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


