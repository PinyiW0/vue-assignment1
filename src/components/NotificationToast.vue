<script lang="ts" setup>
import { useNotification } from '../composables/useNotification'

const { notifications, closeNotification } = useNotification()

const getNotificationClass = (type: string) => {
  const baseClass = 'text-white rounded-lg shadow-lg flex items-center min-w-300px'
  switch (type) {
    case 'success':
      return `${baseClass} bg-green-700`
    case 'error':
      return `${baseClass} bg-red-700`
    case 'warning':
      return `${baseClass} bg-yellow-600`
    case 'info':
      return `${baseClass} bg-blue-700`
    default:
      return `${baseClass} bg-green-700`
  }
}
</script>

<template>
  <div class="fixed top-0 right-0 p-3 z-50 space-y-2">
    <div v-for="notification in notifications" :key="notification.id" :class="getNotificationClass(notification.type)">
      <div class="flex-1 p-4">{{ notification.message }}</div>
      <button type="button" @click="closeNotification(notification.id)"
        class="text-white border-0 bg-transparent hover:(text-gray-200 opacity-60 cursor-pointer) p-2 m-2 rounded transition-colors">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>
