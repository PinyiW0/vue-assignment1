<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNotification } from '../composables/useNotification'

const { showNotification } = useNotification()

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Product {
  id: number
  name: string
  price: number
}

const cartItems = ref<CartItem[]>([])

const emit = defineEmits<{
  removeFromCart: [itemId: number, itemName: string]
}>()

const handleRemove = (itemId: number) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
    } else {
      const index = cartItems.value.findIndex(item => item.id === itemId)
      if (index > -1) {
        cartItems.value.splice(index, 1)
      }
    }
    emit('removeFromCart', itemId, item.name)
  }
}

// 增加數量
const increaseQuantity = (itemId: number) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity++
    showNotification(`${item.name} 數量 +1`, 'success')
  }
}

// 減少數量
const decreaseQuantity = (itemId: number) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
      showNotification(`${item.name} 數量 -1`, 'warning')
    } else {
      const index = cartItems.value.findIndex(item => item.id === itemId)
      if (index > -1) {
        cartItems.value.splice(index, 1)
        showNotification(`${item.name} 已從購物車移除`, 'warning')
        emit('removeFromCart', itemId, item.name)
      }
    }
  }
}

// 增加數量
const addItem = (product: Product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
    showNotification(`${product.name} 數量 +1`, 'success')
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
    showNotification(`${product.name} 已加入購物車`, 'success')
  }
}

// 計算總價
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

// 計算總數量
const totalQuantity = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

defineExpose({
  addItem,
  totalPrice,
  totalQuantity
})
</script>

<template>
  <div class="w-full lg:w-80 xl:w-96">
    <h2 class="text-2xl font-bold mb-6">購物車</h2>
    <div class="bg-white rounded-lg border-(px solid gray-200) mb-6">
      <div v-for="item in cartItems" :key="item.id" class="border-b border-gray-200 p-4 last:border-b-0">
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <h6 class="font-medium mb-1">{{ item.name }}</h6>
            <small class="text-gray-500">單價：${{ item.price }}</small>
          </div>
          <span class="text-lg font-bold text-gray-800">${{ item.price * item.quantity }}</span>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <button @click="decreaseQuantity(item.id)"
              class="w-8 h-8 rounded-2 bg-gray-200 border-0 hover:(bg-gray-300 cursor-pointer) flex items-center justify-center text-gray-600 transition-colors">
              -
            </button>
            <span class="mx-2 min-w-8 text-center">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)"
              class="w-8 h-8 rounded-2 bg-green-500 border-0 hover:(bg-green-600 cursor-pointer) flex items-center justify-center text-white transition-colors">
              +
            </button>
          </div>

          <button @click="handleRemove(item.id)"
            class="bg-transparent border border-red-500 text-red-500 duration-300 hover:(bg-red-500 text-white cursor-pointer) px-3 py-1 rounded text-sm transition-colors">
            移除
          </button>
        </div>
      </div>

      <!-- 總計區域 -->
      <div v-if="cartItems.length > 0" class="border-(px solid gray-200) p-4 bg-gray-20">
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-600">總數量：</span>
          <span class="font-medium">{{ totalQuantity }} 件</span>
        </div>
        <div class="flex justify-between items-center text-lg font-bold">
          <span>總金額：</span>
          <span class="text-green-600">${{ totalPrice }}</span>
        </div>
      </div>

      <div v-if="cartItems.length === 0" class="p-8 text-center text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4m16 0H4">
          </path>
        </svg>
        <p>購物車是空的</p>
        <p class="text-sm mt-1">快去選購您喜歡的商品吧！</p>
      </div>
    </div>
  </div>
</template>
