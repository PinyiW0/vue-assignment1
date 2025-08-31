<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MenuItem {
  id: number,
  title: string,
  price: number,
  stock: number,
  description: string,
  isEdit: boolean
}
interface HeaderItem {
  key: string,
  label: string,
  width: string,
}

const tableHeaders = ref<HeaderItem[]>([
  { key: 'name', label: '品項', width: 'w-[200px]' },
  { key: 'price', label: '價錢', width: 'w-[100px]' },
  { key: 'stock', label: '庫存', width: 'w-[100px]' },
  { key: 'description', label: '描述', width: 'w-[280px]' },
  { key: 'actions', label: '操作', width: 'w-[180px]' }
])

const menuList = ref<MenuItem[]>([
  { id: 1, title: '珍珠奶茶', price: 50, stock: 10, description: '香濃奶茶搭配QQ珍珠', isEdit: false },
  { id: 2, title: '冬瓜檸檬', price: 45, stock: 18, description: '清新冬瓜配上新鮮檸檬', isEdit: false },
  { id: 3, title: '翡翠檸檬', price: 55, stock: 34, description: '綠茶與檸檬的完美結合', isEdit: false },
  { id: 4, title: '四季春茶', price: 45, stock: 10, description: '香醇四季春茶，回甘無比', isEdit: false },
  { id: 5, title: '阿薩姆奶茶', price: 50, stock: 25, description: '阿薩姆紅茶搭配香醇鮮奶', isEdit: false },
  { id: 6, title: '檸檬冰茶', price: 45, stock: 20, description: '檸檬與冰茶的清新組合', isEdit: false },
  { id: 7, title: '芒果綠茶', price: 55, stock: 18, description: '芒果與綠茶的獨特風味', isEdit: false },
  { id: 8, title: '抹茶拿鐵', price: 60, stock: 20, description: '抹茶與鮮奶的絕配', isEdit: false },
])

const originalItem = ref<Partial<MenuItem> | null>(null)

// 編輯
const handleEdit = (id: number) => {
  menuList.value.forEach(item => {
    if (item.id === id) {
      originalItem.value = { ...item }
      item.isEdit = !item.isEdit
    } else {
      item.isEdit = false
    }
  })
}
// 儲存
const handleSave = (id: number) => {
  const item = menuList.value.find(item => item.id === id)
  if (item) {
    item.isEdit = false
    localStorage.setItem('menuList', JSON.stringify(menuList.value))
    originalItem.value = null
  }
}
// 刪除
const handleDel = (id: number) => {
  if (confirm('確定要刪除嗎？')) {
    const index = menuList.value.findIndex(item => item.id === id)
    if (index !== -1) {
      menuList.value.splice(index, 1)
      localStorage.setItem('menuList', JSON.stringify(menuList.value))
    }
  }
}
// 取消編輯
const handleCancel = (id: number) => {
  const item = menuList.value.find(item => item.id === id)
  if (item && originalItem.value) {
    Object.assign(item, { ...originalItem.value, isEdit: false })
    originalItem.value = null
  }
}

onMounted(() => {
  const saved = localStorage.getItem('menuList')
  if (saved) {
    menuList.value = JSON.parse(saved)
  }
})
</script>

<template>
  <div class="p-5 max-w-1200px mx-auto">
    <h1 class="text-#2c3e50 mb-5 text-center text-2xl font-bold">菜單編輯器</h1>

    <div class="bg-white rounded-3 p-5 shadow-lg">
      <div class="overflow-x-auto rounded-t-3">
        <table class="min-w-full table-fixed border-collapse border border-gray-300 w-full rounded-3 overflow-hidden">
          <colgroup>
            <col class="w-180px" />
            <col class="w-80px" />
            <col class="w-80px" />
            <col class="w-230px" />
            <col class="w-120px" />
          </colgroup>

          <thead class="bg-gray-100">
            <tr>
              <th v-for="i in tableHeaders" :key="i.key"
                class="py-4 px-6 font-bold text-gray-700 whitespace-nowrap tracking-wider border border-gray-300">
                {{ i.label }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(i) in menuList" :key="i.id" class="h-18">
              <!-- 品項 -->
              <td class="py-3 px-4 border border-gray-300 align-middle">
                <p v-if="!i.isEdit" class="text-gray-600">{{ i.title }}</p>
                <input v-else v-model="i.title"
                  class="w-full border border-gray-300 text-sm text-gray-600 rounded px-4 py-2" />
              </td>

              <!-- 價錢 -->
              <td class="py-3 px-4 border border-gray-300 align-middle">
                <p v-if="!i.isEdit" class="text-gray-600 text-center">${{ i.price }}</p>
                <input v-else type="number" v-model="i.price"
                  class="w-full border border-gray-300 text-sm rounded px-2 py-2 text-center" />
              </td>

              <!-- 庫存 -->
              <td class="py-3 px-4 border border-gray-300 align-middle">
                <p v-if="!i.isEdit" class="text-gray-600 text-center">{{ i.stock }}</p>
                <input v-else type="number" v-model="i.stock"
                  class="w-full border border-gray-300 text-sm rounded px-2 py-2 text-center" />
              </td>

              <!-- 描述 -->
              <td class="py-3 px-4 border border-gray-300 align-middle">
                <p v-if="!i.isEdit" class="text-gray-600 text-center leading-5">{{ i.description }}</p>
                <input v-else v-model="i.description" class="w-full border border-gray-300 text-sm rounded px-3 py-2" />
              </td>

              <!-- 操作 -->
              <td class="py-3 px-4 border border-gray-300 align-middle text-center">
                <div class="flex justify-center items-center gap-2">
                  <button v-if="!i.isEdit" @click="handleEdit(i.id)" type="button"
                    class="p-2 rounded border border-gray-300 border-0 hover:bg-blue-100 cursor-pointer transition-colors duration-200">
                    <img src="/src/assets/icon/square-pen.svg" alt="" class="w-5 h-5 opacity-60">
                  </button>
                  <button v-else @click="handleSave(i.id)" type="button"
                    class="p-2 rounded border border-green-500 bg-green-200 border-0 hover:opacity-80 cursor-pointer transition-opacity duration-200">
                    <img src="/src/assets/icon/check.svg" alt="" class="w-5 h-5 opacity-60">
                  </button>
                  <button v-if="!i.isEdit" @click="handleDel(i.id)" type="button"
                    class="p-2 rounded border border-gray-300 border-0 hover:bg-red-100 cursor-pointer transition-colors duration-200">
                    <img src="/src/assets/icon/trash-2.svg" alt="" class="w-5 h-5 opacity-60">
                  </button>
                  <button v-else @click="handleCancel(i.id)" type="button"
                    class="p-2 rounded border border-gray-300 bg-white border-0 hover:opacity-80 cursor-pointer transition-opacity duration-200">
                    <img src="/src/assets/icon/x.svg" alt="" class="w-5 h-5 opacity-60">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
