<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">
        <div class="max-w-5xl mx-auto">

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-primary">Hồ sơ cá nhân</h1>
                    <p class="text-base-content/60 mt-1">Quản lý thông tin và cài đặt tài khoản của bạn.</p>
                </div>

                <button v-if="!isEditing && !isLoading" @click="startEditing"
                    class="btn btn-secondary bg-accent p-5 text-base-content font-bold shadow-lg hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Chỉnh sửa thông tin
                </button>
            </div>

            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-1">
                    <div class="card bg-base-100 shadow-xl border border-base-200 top-4 sticky">
                        <div class="card-body items-center text-center p-8">
                            <!-- <div class="avatar placeholder mb-4">
                                <div
                                    class="bg-gradient-to-tr from-primary to-secondary text-white rounded-full w-28 ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2 shadow-lg">
                                    <span class="text-4xl font-bold uppercase content-center">{{
                                        getInitialLetter()
                                    }}</span>
                                </div>
                            </div> -->
                            <div class="avatar placeholder mb-4">
                                <div
                                    class="bg-gradient-to-tr from-primary to-secondary text-white rounded-full w-28 h-28 flex items-center justify-center ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2 shadow-lg">

                                    <span class="text-4xl font-bold uppercase">
                                        {{ getInitialLetter() }}
                                    </span>

                                </div>
                            </div>
                            <h2 class="card-title text-2xl mt-2">{{ getFullName() }}</h2>
                            <div
                                :class="['badge badge-lg mt-2 font-semibold border-none', role === 'ADMIN' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary']">
                                {{ role === 'ADMIN' ? 'Quản trị viên' : 'Độc giả thành viên' }}
                            </div>

                            <div class="divider my-2 w-full"></div>

                            <div class="w-full text-left space-y-3 mt-2">
                                <div class="flex items-center gap-3 text-base-content/80 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span class="truncate">{{ formData.email }}</span>
                                </div>
                                <div class="flex items-center gap-3 text-base-content/80 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Tài khoản đã xác thực</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <div class="card bg-base-100 shadow-xl border border-base-200 relative overflow-hidden">
                        <div v-if="isEditing"
                            class="bg-warning text-warning-content text-xs font-bold uppercase tracking-widest text-center py-2 absolute top-0 w-full animate-fade-in-down z-10">
                            Đang trong chế độ chỉnh sửa
                        </div>

                        <div class="card-body p-6 md:p-10" :class="{ 'pt-12': isEditing }">
                            <h3 class="text-xl font-bold border-b border-base-200 pb-4 mb-6 text-base-content/80">
                                Thông tin chi tiết
                            </h3>

                            <form @submit.prevent="updateProfile">

                                <div v-if="role === 'READER'" class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Họ
                                                lót</span></label>
                                        <input type="text" v-model="formData.hoLot" :disabled="!isEditing" required
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>
                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Tên</span></label>
                                        <input type="text" v-model="formData.ten" :disabled="!isEditing" required
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Giới
                                                tính</span></label>
                                        <select v-model="formData.phai" :disabled="!isEditing"
                                            class="select select-bordered w-full focus:select-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all disabled:opacity-100 appearance-none">
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Ngày
                                                sinh</span></label>
                                        <input type="date" v-model="formData.ngaySinh" :disabled="!isEditing"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Điện
                                                thoại</span></label>
                                        <input type="tel" v-model="formData.dienThoai" :disabled="!isEditing"
                                            placeholder="Chưa cập nhật"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>
                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Email (Cố
                                                định)</span></label>
                                        <input type="email" :value="formData.email" disabled
                                            class="input bg-base-200 text-base-content/50 border-transparent cursor-not-allowed w-full" />
                                    </div>

                                    <div class="form-control md:col-span-2">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Địa chỉ hiện
                                                tại</span></label>
                                        <input type="text" v-model="formData.diaChi" :disabled="!isEditing"
                                            placeholder="Chưa cập nhật"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>
                                </div>

                                <div v-else-if="role === 'ADMIN'"
                                    class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div class="form-control md:col-span-2">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Họ tên Nhân
                                                viên</span></label>
                                        <input type="text" v-model="formData.hoTenNV" :disabled="!isEditing" required
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>

                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Chức
                                                vụ</span></label>
                                        <input type="text" v-model="formData.chucVu" :disabled="!isEditing"
                                            placeholder="Chưa cập nhật"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>
                                    <div class="form-control">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Số điện
                                                thoại</span></label>
                                        <input type="tel" v-model="formData.soDienThoai" :disabled="!isEditing"
                                            placeholder="Chưa cập nhật"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>

                                    <div class="form-control md:col-span-2">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Email (Cố
                                                định)</span></label>
                                        <input type="email" :value="formData.email" disabled
                                            class="input bg-base-200 text-base-content/50 border-transparent cursor-not-allowed w-full" />
                                    </div>

                                    <div class="form-control md:col-span-2">
                                        <label class="label"><span
                                                class="label-text font-semibold text-base-content/70">Địa chỉ liên
                                                hệ</span></label>
                                        <input type="text" v-model="formData.diaChi" :disabled="!isEditing"
                                            class="input input-bordered w-full focus:input-primary disabled:bg-base-200/50 disabled:text-base-content disabled:border-transparent transition-all" />
                                    </div>
                                </div>

                                <div v-if="isEditing"
                                    class="mt-8 flex justify-end gap-3 border-t border-base-200 pt-6 animate-fade-in">
                                    <button type="button" @click="cancelEditing"
                                        class="btn btn-neutral bg-black text-white hover:bg-base-200 px-2 shadow-md">
                                        Hủy bỏ
                                    </button>
                                    <button type="submit" class="btn btn-primary bg-primary px-3 text-white shadow-md"
                                        :disabled="isSaving">
                                        <span v-if="isSaving" class="loading loading-spinner"></span>
                                        <!-- <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg> -->
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="toast.show" class="toast toast-end toast-bottom z-50">
            <div
                :class="['alert text-white shadow-lg font-medium animate-fade-in-up', toast.type === 'success' ? 'alert-success' : 'alert-error']">
                <span>{{ toast.msg }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';

const authStore = useAuthStore();
const role = ref(authStore.user?.role || 'READER');
const isLoading = ref(true);
const isSaving = ref(false);
const isEditing = ref(false); // Trạng thái khóa/mở form
const toast = ref({ show: false, msg: '', type: '' });

const formData = ref({});
let originalData = {}; // Lưu trữ dữ liệu gốc để khôi phục khi ấn "Hủy"

// Bật chế độ sửa
const startEditing = () => {
    isEditing.value = true;
};

// Hủy chế độ sửa và khôi phục dữ liệu
const cancelEditing = () => {
    formData.value = { ...originalData }; // Đưa dữ liệu về lại lúc ban đầu
    isEditing.value = false;
};

// --- LẤY DỮ LIỆU TỪ BACKEND ---
const fetchProfile = async () => {
    isLoading.value = true;
    try {
        const endpoint = role.value === 'ADMIN' ? '/admins/profile' : '/users/profile';
        const res = await api.get(endpoint);
        const data = res.data.data || res.data;

        if (data.ngaySinh) {
            data.ngaySinh = new Date(data.ngaySinh).toISOString().split('T')[0];
        }

        formData.value = { ...data };
        originalData = { ...data }; // Sao chép sâu để lưu làm bản gốc
    } catch (error) {
        showToast('Không thể tải thông tin cá nhân.', 'error');
    } finally {
        isLoading.value = false;
    }
};

// --- CẬP NHẬT DỮ LIỆU ---
const updateProfile = async () => {
    isSaving.value = true;
    try {
        const endpoint = role.value === 'ADMIN' ? '/admins/profile/edit' : '/users/profile/edit';
        await api.patch(endpoint, formData.value);

        showToast('Cập nhật thông tin thành công!', 'success');

        // Cập nhật lại bản gốc để lần sau ấn "Hủy" nó lấy dữ liệu mới này
        originalData = { ...formData.value };

        // Đóng chế độ Edit
        isEditing.value = false;

        // Cập nhật Store & LocalStorage
        if (role.value === 'READER') {
            authStore.user.hoLot = formData.value.hoLot;
            authStore.user.ten = formData.value.ten;
        } else {
            authStore.user.hoTenNV = formData.value.hoTenNV;
        }
        localStorage.setItem('user', JSON.stringify(authStore.user));

    } catch (error) {
        showToast(error.response?.data?.message || 'Có lỗi xảy ra khi lưu!', 'error');
    } finally {
        isSaving.value = false;
    }
};

// --- HÀM TIỆN ÍCH CHO GIAO DIỆN ---
const getFullName = () => {
    if (role.value === 'ADMIN') return formData.value.hoTenNV || 'Nhân viên';
    return `${formData.value.hoLot || ''} ${formData.value.ten || ''}`.trim() || 'Độc giả';
};

const getInitialLetter = () => {
    if (role.value === 'ADMIN' && formData.value.hoTenNV) {
        return formData.value.hoTenNV.charAt(0);
    }
    if (role.value === 'READER' && formData.value.ten) {
        return formData.value.ten.charAt(0);
    }
    return 'U';
};

const showToast = (msg, type) => {
    toast.value = { show: true, msg, type };
    setTimeout(() => toast.value.show = false, 3000);
};

onMounted(() => {
    fetchProfile();
});
</script>

<style scoped>
/* Hiệu ứng hiển thị mượt mà */
.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

.animate-fade-in-down {
    animation: fadeInDown 0.3s ease-out forwards;
}

.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Thủ thuật CSS cho thẻ select khi bị disabled để trông không bị mờ quá */
select:disabled {
    opacity: 1 !important;
    color: inherit;
}
</style>