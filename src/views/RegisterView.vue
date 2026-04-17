<template>
    <div class="min-h-screen bg-base-300 flex items-center justify-center p-4 sm:p-8 animate-fade-in">
        <div class="card w-full max-w-2xl bg-base-300 shadow-2xl border border-base-200 rounded-3xl">
            <div class="card-body p-8 md:p-12">

                <div class="text-center mb-8">
                    <div
                        class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 class="text-3xl font-bold text-base-content">Đăng ký tài khoản</h1>
                    <p class="text-base-content/50 mt-2 font-medium">Trở thành độc giả của Libverse ngay hôm nay</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-5">

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Họ lót
                                    <span class="text-error">*</span></span></label>
                            <input type="text" v-model="formData.hoLot"
                                class="input w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required />
                        </div>
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Tên
                                    <span class="text-error">*</span></span></label>
                            <input type="text" v-model="formData.ten"
                                class="input w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Email
                                    <span class="text-error">*</span></span></label>
                            <input type="email" v-model="formData.email"
                                class="input  w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required />
                        </div>
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">
                                    Điện thoại</span></label>
                            <input type="tel" v-model="formData.dienThoai"
                                class="input w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Giới
                                    tính</span></label>
                            <select v-model="formData.phai"
                                class="select  select-bordered w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Ngày
                                    sinh</span></label>
                            <input type="date" v-model="formData.ngaySinh"
                                class="input  w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Địa chỉ
                                hiện tại</span></label>
                        <input type="text" v-model="formData.diaChi" 
                            class="input w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>

                    <div class="divider my-2 bg-orange-400"></div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Mật
                                    khẩu <span class="text-error">*</span></span></label>
                            <input type="password" v-model="formData.password"
                                class="input focus:border-primary w-full p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                required minlength="6" />
                        </div>
                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold text-base-content/70">Xác
                                    nhận mật khẩu <span class="text-error">*</span></span></label>
                            <input type="password" v-model="confirmPassword" 
                                class="input  w-full p-2 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                :class="passwordError ? 'border-error focus:border-error focus:ring-error' : (passwordMatch ? 'border-success focus:border-success focus:ring-success' : 'focus:border-primary focus:ring-primary')"
                                required />
                            <span v-if="passwordError" class="text-error text-xs font-medium mt-1 ml-1">Mật khẩu không
                                khớp!</span>
                        </div>
                    </div>

                    <div v-if="errorMessage" class="alert alert-error text-white shadow-sm mt-6 rounded-xl py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{{ errorMessage }}</span>
                    </div>

                    <div v-if="successMessage" class="alert alert-success text-white shadow-sm mt-6 rounded-xl py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-5 w-5" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm">{{ successMessage }}</span>
                    </div>

                    <div class="form-control mt-8">
                        <button type="submit"
                            class="btn btn-primary w-full bg-base-content text-white rounded-xl h-12 text-lg shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                            :disabled="isLoading || passwordError">
                            <span v-if="isLoading" class="loading loading-spinner"></span>
                            Đăng ký tài khoản
                        </button>
                    </div>
                </form>

                <p class="text-center text-sm font-medium mt-8 text-base-content/60">
                    Đã có tài khoản?
                    <RouterLink to="/login"
                        class="link link-primary hover:text-primary-focus transition-colors ml-1 font-bold">
                        Đăng nhập ngay
                    </RouterLink>
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const formData = ref({
    hoLot: '',
    ten: '',
    email: '',
    password: '',
    phai: 'Nam',
    ngaySinh: '',
    dienThoai: '',
    diaChi: ''
});

const confirmPassword = ref('');

// Computed check mật khẩu
const passwordError = computed(() => {
    if (confirmPassword.value === '') return false;
    return formData.value.password !== confirmPassword.value;
});

const passwordMatch = computed(() => {
    if (confirmPassword.value === '' || formData.value.password === '') return false;
    return formData.value.password === confirmPassword.value;
});

const handleRegister = async () => {
    errorMessage.value = '';
    successMessage.value = '';

    if (formData.value.password !== confirmPassword.value) {
        errorMessage.value = "Vui lòng kiểm tra lại. Mật khẩu không khớp.";
        return;
    }

    isLoading.value = true;

    try {
        const response = await api.post('/auth/register/reader', formData.value);

        successMessage.value = 'Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...';

        setTimeout(() => {
            router.push('/login');
        }, 2000);

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        errorMessage.value = error.response?.data?.message || 'Có lỗi xảy ra, không thể đăng ký. Email có thể đã tồn tại.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.98);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Ẩn icon mũi tên mặc định của input type="date" cho gọn gàng (Tùy chọn) */
::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s;
}

::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
}
</style>