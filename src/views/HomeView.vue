<template>
  <div class="p-8 text-center">
    <h1 class="text-4xl font-bold text-success mb-4">Đăng nhập thành công! 🎉</h1>
    <p class="text-xl">Chào mừng bạn trở lại hệ thống.</p>
  </div>
  <div class="p-8 text-center">
    <h1 class="text-4xl font-bold text-error mb-4">Bạn chưa đăng nhập</h1>
    <p class="text-xl">Vui lòng đăng nhập để tiếp tục.</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>
