<template>
  <div data-theme="emerald" class="min-h-screen bg-base-100 flex items-center justify-center p-4">
    <div class="card w-full max-w-md shadow-2xl bg-base-200 border border-base-200">
      <div class="card-body p-8">
        <div class="tabs tabs-boxed grid grid-cols-2 mb-4 bg-base-200 p-1">
          <button class="tab transition-all duration-300 font-medium text-base"
            :class="{ 'bg-base-content text-base-100 rounded-md shadow': role === 'READER' }" @click="role = 'READER'">
            Độc Giả
          </button>
          <button class="tab transition-all duration-300 font-medium text-base"
            :class="{ 'bg-base-content text-base-100 rounded-md shadow': role === 'ADMIN' }" @click="role = 'ADMIN'">
            Nhân Viên
          </button>
        </div>

        <form @submit.prevent="handleLogin" class="w-full">
          <div class="flex flex-col gap-2 mb-4">
            <label class="font-bold uppercase text-xs tracking-widest text-base-content/70 ml-1">
              Email
            </label>
            <input type="email" v-model="email" placeholder="ten@example.com"
              class="input mt-2 input-bordered w-full focus:input-primary bg-base-100 px-2" required />
          </div>

          <div class="flex flex-col gap-2 mb-6">
            <label class="font-bold uppercase text-xs tracking-widest text-base-content/70 ml-1">
              Mật khẩu
            </label>
            <input type="password" v-model="password" placeholder="••••••••"
              class="input mt-2 input-bordered w-full focus:input-primary bg-base-100 px-2" required />

            <div class="flex justify-end gap-4 mt-1" v-if="role === 'READER'">
              <RouterLink to="/forgot-password" class="text-sm font-medium text-primary hover:underline">
                Quên mật khẩu?
              </RouterLink>
            
            </div>
          </div>

          <div v-if="errorMessage" class="alert alert-error text-sm py-3 rounded-lg text-white shadow-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <button type="submit"
            class="btn w-full bg-orange-400 decoration-primary-content hover:bg-secondary-focus text-base-200-content"
            :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner"></span>
            <span v-else>Đăng Nhập</span>
          </button>
        </form>

        <div class="divider text-xs text-base-content/40 uppercase tracking-widest mt-6 mb-6" v-if="role === 'READER'">
          Hoặc
        </div>

        <GoogleLogin :callback="handleGoogleCallback" v-if="role === 'READER'">
          <button type="button"
            class="btn btn-outline w-full gap-3 border-base-600 hover:bg-base-300 hover:border-base-300 hover:text-base-content transition-colors font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Đăng nhập bằng Google
          </button>
        </GoogleLogin>

        <p class="text-center text-sm mt-3 text-base-content/70" v-if="role === 'READER'">
          Chưa có tài khoản?
          <RouterLink to="/register" class="link link-primary font-bold hover:text-primary-focus transition-colors">Đăng
            ký</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import { GoogleLogin, googleTokenLogin } from 'vue3-google-login'
import { useAuthStore } from '@/stores/auth'
const router = useRouter()
const authStore = useAuthStore()

const role = ref('READER')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const endpoint = role.value === 'ADMIN' ? '/auth/login/admin' : '/auth/login/reader'

    const response = await api.post(endpoint, {
      email: email.value,
      password: password.value,
    })

    // localStorage.setItem('token', response.data.data.token)
    // localStorage.setItem('user', JSON.stringify(response.data.data.user))
    // // authStore.token = response.data.data.token
    // // authStore.user = response.data.data.user

    authStore.setAuth(response.data.data)

    router.push('/')

  } catch (error) {
    console.error('Lỗi đăng nhập:', error)
    errorMessage.value =
      error.response?.data?.message || 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleCallback = async (response) => {
  isLoading.value = true;

  // Kiểm tra xem nó có phải là Object chứa credential không
  // console.log("Full Response:", response);

  // Đây là nơi chứa id_token chuẩn cho hàm verifyIdToken ở Backend
  // const idToken = response.credential;

  // console.log("Credential received:", idToken);

  // if (!idToken) {
  //   console.error("Vẫn không lấy được credential. Google trả về:", response);
  //   errorMessage.value = "Lỗi: Google không trả về ID Token. Hãy thử xóa cache trình duyệt.";
  //   isLoading.value = false;
  //   return;
  // }

  // console.log("ID Token nhận được (ey...):", idToken);

  try {
    const res = await api.post('/auth/login/google', {
      googleToken: response.code, // Gửi chuỗi JWT lên Backend
    });

    const result = res.data.data; // Lấy từ hộp 'data' theo controller của bạn

    if (result && result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      authStore.token = result.token;
      authStore.user = result.user;
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Xác thực Google thất bại.';
  } finally {
    isLoading.value = false;
  }
};

</script>
