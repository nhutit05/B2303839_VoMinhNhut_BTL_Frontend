<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">
        <div class="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div class="text-center md:text-left">
                <h1 class="text-4xl font-black text-primary">Tất cả loại sách</h1>
                <p class="text-base-content/60 mt-2">Khám phá và mượn những cuốn sách bạn yêu thích.</p>
            </div>

            <div class="join w-full max-w-md shadow-sm">
                <input v-model="searchQuery"
                    class="input input-bordered join-item w-full focus:outline-none focus:border-primary"
                    placeholder="Tìm kiếm theo tên sách, tác giả..." />
                <button class="btn btn-primary join-item">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="w-full">

            <div v-if="filteredBooks.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="book in filteredBooks" :key="book._id"
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200 group">

                    <figure class="px-4 pt-4 relative">
                        <div
                            class="w-full h-64 bg-base-200 rounded-xl flex items-center justify-center overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-20 w-20 text-base-300 group-hover:scale-110 transition-transform" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>

                        <div v-if="book.soQuyen <= 0"
                            class="absolute inset-0 bg-base-300/60 flex items-center justify-center rounded-xl m-4">
                            <span class="badge badge-error p-4 font-bold text-white shadow">TẠM HẾT</span>
                        </div>
                    </figure>

                    <div class="card-body p-5">
                        <h2 class="card-title text-lg leading-tight mb-1">{{ book.tenSach }}</h2>

                        <div class="space-y-1 mt-2">
                            <p class="text-sm text-base-content/80 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {{ book.tacGia }}
                            </p>

                            <p v-if="book.namXuatBan" class="text-xs text-base-content/60 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Xuất bản: {{ book.namXuatBan }}
                            </p>
                        </div>

                        <div class="card-actions justify-between items-end mt-4">
                            <div class="flex flex-col">
                                <span class="text-xs text-base-content/60">Trạng thái</span>
                                <span :class="['text-sm font-bold', book.soQuyen > 0 ? 'text-success' : 'text-error']">
                                    {{ book.soQuyen > 0 ? `Còn ${book.soQuyen} quyển` : 'Hết sách' }}
                                </span>
                            </div>

                            <button @click="openBorrowModal(book)"
                                class="btn bg-secondary text-secondary-content rounded-lg px-4"
                                :disabled="book.soQuyen <= 0">
                                Mượn ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-24 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/20 mb-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-xl font-medium text-base-content/60">Không tìm thấy cuốn sách nào khớp với từ khóa.</p>
                <button v-if="searchQuery" @click="searchQuery = ''" class="btn btn-outline btn-sm mt-4">Xóa tìm
                    kiếm</button>
            </div>
        </div>

        <dialog id="borrow_modal" class="modal">
            <div class="modal-box bg-base-100 p-8 border border-base-200">
                <h3 class="font-black text-2xl text-primary mb-2">Xác nhận mượn sách</h3>
                <p class="text-base-content/80 mb-6">
                    Bạn đang yêu cầu mượn cuốn sách <span class="font-bold text-base-content">"{{ selectedBook?.tenSach
                    }}"</span>.
                </p>

                <div class="bg-base-200/50 p-5 rounded-xl space-y-3 mb-8 text-sm border border-base-200">
                    <div class="flex justify-between border-b border-base-300 pb-2">
                        <span class="text-base-content/70">Người mượn:</span>
                        <span class="font-semibold">{{ user.hoTen }}</span>
                    </div>
                    <div class="flex justify-between border-b border-base-300 pb-2">
                        <span class="text-base-content/70">Ngày mượn:</span>
                        <span class="font-semibold">{{ today }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-base-content/70">Tác giả sách:</span>
                        <span class="font-semibold">{{ selectedBook?.tacGia }}</span>
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn btn-ghost px-2" @click="closeModal">Hủy bỏ</button>
                    <button class="btn btn-primary bg-amber-500 px-2 ml-2 font-bold" @click="confirmBorrow"
                        :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="loading loading-spinner"></span>
                        Xác nhận
                    </button>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button @click="closeModal">close</button>
            </form>
        </dialog>

        <div v-if="toast.show" class="toast toast-end toast-bottom z-50">
            <div
                :class="['alert text-white shadow-lg font-medium', toast.type === 'success' ? 'alert-success' : 'alert-error']">
                <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ toast.msg }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
// Lấy thông tin user an toàn, ưu tiên Store
const user = authStore.user || JSON.parse(localStorage.getItem('user') || '{}');

const books = ref([]);
const searchQuery = ref('');
const isLoading = ref(true);
const isSubmitting = ref(false);
const selectedBook = ref(null);
const toast = ref({ show: false, msg: '', type: '' });

const today = new Date().toLocaleDateString('vi-VN');

// 1. Fetch Danh sách Sách
const fetchBooks = async () => {
    isLoading.value = true;
    try {
        const res = await api.get('/books');
        books.value = res.data.data;
    } catch (err) {
        console.error("Lỗi tải sách:", err);
    } finally {
        isLoading.value = false;
    }
};

// 2. Logic Lọc Tìm Kiếm (Đã bỏ Category)
const filteredBooks = computed(() => {
    if (!searchQuery.value) return books.value;

    const query = searchQuery.value.toLowerCase();
    return books.value.filter(book => {
        return book.tenSach?.toLowerCase().includes(query) ||
            book.tacGia?.toLowerCase().includes(query);
    });
});

// 3. Quản lý Modal
const openBorrowModal = (book) => {
    selectedBook.value = book;
    document.getElementById('borrow_modal').showModal();
};

const closeModal = () => {
    document.getElementById('borrow_modal').close();
    selectedBook.value = null; // Xóa dữ liệu cũ
};

// 4. Xử lý yêu cầu Mượn
const confirmBorrow = async () => {
    if (!selectedBook.value) return;

    isSubmitting.value = true;
    try {
        // Đảm bảo Payload khớp với Backend của bạn
        await api.post('/borrowings', {
            maSach: selectedBook.value._id,
            maDocGia: user.id || user._id // Tùy cấu trúc ID user của bạn
        });

        showToast('Đã gửi yêu cầu mượn sách. Vui lòng chờ duyệt.', 'success');
        closeModal();
        fetchBooks(); // Tải lại để cập nhật số lượng sách
    } catch (err) {
        const errorMsg = err.response?.data?.message || 'Lỗi hệ thống. Vui lòng thử lại sau.';
        showToast(errorMsg, 'error');
    } finally {
        isSubmitting.value = false;
    }
};

// 5. Tiện ích Toast
const showToast = (msg, type) => {
    toast.value = { show: true, msg, type };
    setTimeout(() => toast.value.show = false, 3500);
};

onMounted(fetchBooks);
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>