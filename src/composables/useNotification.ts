import { ref, provide, inject } from 'vue'

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  visible: boolean
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface NotificationService {
  notifications: ReturnType<typeof ref<Notification[]>>
  showNotification: (message: string, type?: NotificationType) => void
  closeNotification: (id: number) => void
}

// Provide/Inject 的 key
const NOTIFICATION_KEY = Symbol('notification')

// 建立通知服務
export function createNotificationService(): NotificationService {
  const notifications = ref<Notification[]>([])

  const showNotification = (message: string, type: NotificationType = 'success') => {
    const id = Date.now()
    const notification: Notification = {
      id,
      message,
      type,
      visible: true
    }

    notifications.value.push(notification)

    setTimeout(() => {
      closeNotification(id)
    }, 3000)
  }

  const closeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    showNotification,
    closeNotification
  }
}

// 提供通知服務
export function provideNotification(): NotificationService {
  const notificationService = createNotificationService()
  provide(NOTIFICATION_KEY, notificationService)
  return notificationService
}

// 在元件中使用通知服務
export function useNotification(): NotificationService {
  const notificationService = inject<NotificationService>(NOTIFICATION_KEY)

  if (!notificationService) {
    throw new Error('useNotification 必須在 provideNotification 之後使用')
  }

  return notificationService
}
