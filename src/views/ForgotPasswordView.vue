<template>
  <div data-theme="emerald" class="min-h-screen bg-base-100 flex items-center justify-center p-4">
    <div class="card w-full max-w-md shadow-2xl bg-base-200 border border-base-200">
      <div class="card-body p-8">
        
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-primary mb-2">Quên Mật Khẩu?</h2>
        </div>

        <form @submit.prevent="handleForgotPassword" class="w-full" v-if="!isSuccess">
          <div class="flex flex-col gap-2 mb-6">
            <label class="font-bold uppercase text-xs tracking-widest text-base-content/70 ml-1">
              Email của bạn
            </label>
            <input 
              type="email" 
              v-model="email" 
              placeholder="ten@example.com"
              class="input mt-2 input-bordered w-full focus:input-primary bg-base-100 px-2" 
              required 
            />
          </div>

          <div v-if="errorMessage" class="alert alert-error text-sm py-3 rounded-lg text-white shadow-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <button type="submit"
            class="btn w-full bg-orange-400 decoration-primary-content hover:bg-secondary-focus text-base-200-content"
            :disabled="isLoading || !email">
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-else>Gửi Yêu Cầu</span>
          </button>
        </form>

        <div v-else class="text-center py-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 text-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2">Đã gửi email khôi phục!</h3>
          <p class="text-sm text-base-content/70 mb-6">
            Vui lòng kiểm tra hộp thư đến (và thư mục Spam) của <strong>{{ email }}</strong> và làm theo hướng dẫn.
          </p>
        </div>

        <div class="divider mt-6 mb-4"></div>
        <div class="text-center">
          <RouterLink to="/login" class="text-sm font-medium text-base-content/70 hover:text-primary transition-colors flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại đăng nhập
          </RouterLink>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api'; // Đường dẫn đến file config Axios của bạn

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const isSuccess = ref(false); // Biến để chuyển đổi giao diện sau khi gửi thành công

const handleForgotPassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Gọi API của bạn (thay đổi endpoint cho đúng với Backend)
    // Ví dụ: Backend có route xử lý quên mật khẩu cho độc giả
    await api.post('/auth/forgot-password', {
      email: email.value,
    });

    // Nếu thành công, ẩn form và hiện thông báo
    isSuccess.value = true;
    
  } catch (error) {
    console.error('Lỗi yêu cầu khôi phục mật khẩu:', error);
    errorMessage.value = error.response?.data?.message || 'Không tìm thấy email hoặc có lỗi xảy ra. Vui lòng thử lại.';
  } finally {
    isLoading.value = false;
  }
};
</script>