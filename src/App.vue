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
  { key: 'name', label: '品項', width: 'w-[240px]' },
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
  <div class="w-full flex h-screen overflow-hidden">
    <!-- Asside -->
    <div class="w-50 lg:w-70 shrink-0 h-full bg-primary-10 p-6">
      <div class="my-10 flex flex-col items-center lg:items-end gap-8">
        <div class="flex justify-center items-center gap-1 px-6 lg:px-10 py-2 bg-primary-60 rounded-3">
          <img src="/src/assets/icon/cup-soda.svg" alt="cup-soda" class="w-8 h-10 ">
          <h1 class="mt-1 text-5 lg:text-6 text-gray">菜單編輯器</h1>
        </div>
        <div class="flex flex-col gap-3">
          <button type="button" class="flex gap-2 border-0 bg-transparent text-gray-60 text-5 cursor-pointer group">
            <p class="duration-300 group-hover:opacity-80">第一週作業</p>
            <img src="/src/assets/icon/move-right.svg" alt="arrow" class="duration-300 group-hover:opacity-80">
          </button>
        </div>
      </div>
    </div>
    <!-- main -->
    <div class="p-8 flex flex-1 overflow-y-auto">
      <div class="py-6 px-8 border-(px solid gray-30) flex-1 rounded-3">
        <div class="overflow-hidden rounded-t-3">
          <table class="w-full table-fixed">
            <colgroup>
              <col class="w-280px" />
              <col class="w-100px" />
              <col class="w-100px" />
              <col class="w-200px" />
              <col class="w-180px" />
            </colgroup>

            <thead class="bg-gray-20">
              <tr>
                <th v-for="i in tableHeaders" :key="i.key" :class="i.width"
                  class="py-4 px-6 font-bold text-gray-70 whitespace-nowrap tracking-wider">
                  {{ i.label }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(i) in menuList" :key="i.id" class="h-18">
                <!-- 品項 -->
                <td class="py-3 px-4 border-b-(px solid gray-30) align-middle">
                  <p v-if="!i.isEdit" class="text-gray-60">{{ i.title }}</p>
                  <input v-else v-model="i.title"
                    class="border-(px solid gray-30) text-4 text-gray-60 rounded-1 px-4 py-2" />
                </td>

                <!-- 價錢 -->
                <td class="py-3 px-4 border-b-(px solid gray-30) align-middle">
                  <p v-if="!i.isEdit" class="text-gray-60 text-center">${{ i.price }}</p>
                  <input v-else type="number" v-model="i.price"
                    class="w-full border-(px solid gray-30) text-4 rounded-1 px-2 py-2 text-center" />
                </td>

                <!-- 庫存 -->
                <td class="py-3 px-4 border-b-(px solid gray-30) align-middle">
                  <p v-if="!i.isEdit" class="text-gray-60 text-center">{{ i.stock }}</p>
                  <input v-else type="number" v-model="i.stock"
                    class="w-full border-(px solid gray-30) text-4 rounded-1 px-2 py-2 text-center" />
                </td>

                <!-- 描述 -->
                <td class="py-3 px-4 border-b-(px solid gray-30) align-middle">
                  <p v-if="!i.isEdit" class="text-gray-60 text-center">{{ i.description }}</p>
                  <input v-else v-model="i.description"
                    class="w-full border-(px solid gray-30) text-4 rounded-1 px-3 py-2" />
                </td>

                <!-- 操作 -->
                <td class="py-3 px-4 border-b-(px solid gray-30) align-middle text-center">
                  <div class="flex justify-center items-center gap-2">
                    <button v-if="!i.isEdit" @click="handleEdit(i.id)" type="button"
                      class="p-2 rounded-1 flex justify-center border-(px solid gray-30) hover:(cursor-pointer opacity-80 bg-primary)">
                      <img src="/src/assets/icon/square-pen.svg" alt="" class="w-5 h-5 duration-300 opacity-60">
                    </button>
                    <button v-else @click="handleSave(i.id)" type="button"
                      class="p-2 rounded-1 flex justify-center border-(px solid green-50) bg-#AAD091 hover:(cursor-pointer opacity-80)">
                      <img src="/src/assets/icon/check.svg" alt="" class="w-5 h-5 duration-300 opacity-60">
                    </button>
                    <button v-if="!i.isEdit" @click="handleDel(i.id)" type="button"
                      class="p-2 rounded-1 flex justify-center border-(px solid gray-30) hover:(cursor-pointer opacity-80 bg-pink-100)">
                      <img src="/src/assets/icon/trash-2.svg" alt="" class="w-5 h-5 duration-300 opacity-60">
                    </button>
                    <button v-else @click="handleCancel(i.id)" type="button"
                      class="p-2 rounded-1 flex justify-center border-(px solid gray-30) bg-white hover:(cursor-pointer opacity-80)">
                      <img src="/src/assets/icon/x.svg" alt="" class="w-5 h-5 duration-300 opacity-60">
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
