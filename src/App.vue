<script setup lang="ts"></script>

<template>
  <nav class="px-10 py-6 bg-#2c3e50 flex justify-between items-center">
    <div>
      <h1 class="font-bold text-white text-6">Vue 體驗營作業</h1>
    </div>

    <ul class="flex items-center gap-8">
      <li>
        <router-link to="/"
          class="nav-link text-white no-underline px-4 py-2 rounded-md transition-all duration-300 hover:bg-#34495e">首頁</router-link>
      </li>
      <li>
        <router-link to="/week-two"
          class="nav-link text-white no-underline px-4 py-2 rounded-md transition-all duration-300 hover:bg-#34495e">元件拆分與資料傳遞</router-link>
      </li>
      <li>
        <router-link to="/week-three"
          class="nav-link text-white no-underline px-4 py-2 rounded-md transition-all duration-300 hover:bg-#34495e">作業三</router-link>
      </li>
    </ul>
  </nav>

  <main class="p-8 max-w-1200px mx-auto">
    <router-view />
  </main>
</template>

<style>
.nav-link.router-link-active {
  background-color: #42b883 !important;
  font-weight: bold;
}
</style>
