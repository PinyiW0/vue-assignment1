<script lang="ts" setup>
import { ref } from 'vue'
import ProductList from '../components/ProductList.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import NotificationToast from '../components/NotificationToast.vue'
import mouseImg from '../assets/img/mouse.png'
import { provideNotification } from '../composables/useNotification'

import type { Product } from '../components/ProductList.vue'

// 提供通知服務
provideNotification()

const shoppingCartRef = ref<InstanceType<typeof ShoppingCart>>()

const products = ref<Product[]>([
  {
    id: 1,
    name: '耳罩式藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: '智能滑鼠',
    description: '人體工學設計，提升工作效率',
    price: 2790,
    image: mouseImg
  }
])

const handleAddToCart = (product: Product) => {
  shoppingCartRef.value?.addItem(product)
}

const handleRemoveFromCart = (itemId: number, itemName: string) => {
  console.log('移除商品 ID:', itemId, '商品名稱:', itemName)
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-4 px-4">
    <div class="flex flex-wrap gap-6">
      <!-- 商品列表元件 -->
      <ProductList :products="products" @add-to-cart="handleAddToCart" />

      <!-- 購物車元件 -->
      <ShoppingCart ref="shoppingCartRef" @remove-from-cart="handleRemoveFromCart" />
    </div>

    <!-- 通知元件 -->
    <NotificationToast />
  </div>
</template>