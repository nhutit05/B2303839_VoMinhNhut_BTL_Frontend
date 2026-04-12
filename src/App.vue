<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <NavBar />
  <main class="main-content">
    <RouterView />
  </main>
  <FooterBar />
</template>

<style scoped>
.main-content {
  /* Điều chỉnh con số này bằng với chiều cao của NavBar của bạn */
  padding-top: 80px;
  /* Đảm bảo nội dung không bị dính vào Footer nếu nội dung quá ngắn */
  min-height: calc(100vh - 160px);
}
</style>