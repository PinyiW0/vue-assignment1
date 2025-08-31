<script lang="ts" setup>
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}
defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
}>()

const handleAddToCart = (product: Product) => {
  emit('addToCart', product)
}
</script>

<template>
  <div class="flex-1 min-w-0 lg:flex-2">
    <h2 class="text-2xl font-bold mb-6">商品列表</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden flex-1">
        <img :src="product.image" :alt="product.name" class="w-full h-150px object-cover">
        <div class="p-5">
          <h5 class="text-lg font-semibold mb-2">{{ product.name }}</h5>
          <p class="text-gray-600 mb-3">{{ product.description }}</p>
          <p class="text-xl font-bold text-blue-600 mb-4">$ {{ product.price }}</p>
          <button @click="handleAddToCart(product)"
            class="w-full bg-green-700 hover:bg-green-600 text-white border-0 font-medium py-2 px-4 rounded transition-colors">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
