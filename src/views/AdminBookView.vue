<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">

        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
            <div>
                <h1 class="text-3xl font-bold text-primary">Quản lý kho sách</h1>
                <p class="text-base-content/60 mt-1 font-medium">Hệ thống quản lý thông tin sách và đối tác nhà xuất
                    bản.</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div class="join w-full sm:w-auto shadow-sm">
                    <input type="text" v-model="searchQuery" placeholder="Tìm tên sách, tác giả..."
                        class="input border-s-4 rounded-lg p-2  w-full sm:w-72  transition-all" />
                    <button class="btn btn-square border-base-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                <button @click="openModal('ADD')"
                    class="btn btn-primary bg-primary-content text-base-content p-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Thêm sách mới
                </button>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden rounded-2xl">
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else-if="filteredBooks.length > 0" class="overflow-x-auto">
                <table class="table table-zebra w-full text-base">
                    <thead class="bg-base-200 text-base-content text-sm uppercase tracking-wider">
                        <tr>
                            <th class="py-5 pl-6 font-bold w-1/4">Thông tin sách</th>
                            <th class="py-5 font-bold text-center">Nhà xuất bản</th>
                            <th class="py-5 font-bold text-center">Số lượng</th>
                            <th class="py-5 font-bold text-right">Đơn giá</th>
                            <th class="py-5 pr-6 font-bold text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in filteredBooks" :key="book._id"
                            class="hover:bg-base-200/50 border-b border-base-200 transition-colors">
                            <td class="pl-6 py-4">
                                <div class="font-bold text-lg text-base-content">{{ book.tenSach }}</div>
                                <div class="text-sm text-base-content/60 font-medium">{{ book.tacGia }}</div>
                            </td>
                            <td class="text-center py-4">
                                <div class="badge badge-primary badge-outline font-bold">
                                    {{ book.maNXB?.tenNXB || 'Chưa xác định' }}
                                </div>
                            </td>

                            <td class="text-center py-4 font-bold"
                                :class="book.soQuyen <= 0 ? 'text-error' : 'text-success'">
                                {{ book.soQuyen }}
                            </td>
                            <td class="text-right py-4 font-bold text-primary">
                                {{ formatCurrency(book.donGia) }}
                            </td>
                            <td class="pr-6 py-4 text-right">
                                <div class="flex justify-end gap-2">
                                    <button @click="openModal('EDIT', book)"
                                        class="btn btn-sm btn-square btn-ghost text-info hover:bg-info/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button @click="openDeleteModal(book)"
                                        class="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <dialog id="book_form_modal" class="modal">
            <div class="modal-box w-11/12 max-w-3xl bg-base-100 p-0 overflow-hidden rounded-2xl">
                <div class="bg-base-200/50 px-8 py-5 border-b border-base-200">
                    <h3 class="font-bold text-2xl text-primary">{{ modalMode === 'ADD' ? 'Thêm sách mới'
                        : 'Cập nhật thông tin sách' }}
                    </h3>
                </div>

                <form @submit.prevent="saveBook" class="p-8 space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

                        <div class="form-control md:col-span-2">
                            <label class="label pb-1"><span class="label-text font-semibold">Tên sách <span
                                        class="text-error">*</span></span></label>
                            <input type="text" v-model="formData.tenSach" placeholder="Nhập tên sách..."
                                class="input p-2 bg-gray-100 rounded-lg focus:border-primary w-full" required />
                        </div>

                        <div class="form-control">
                            <label class="label pb-1"><span class="label-text font-semibold">Tác giả <span
                                        class="text-error">*</span></span></label>
                            <input type="text" v-model="formData.tacGia" placeholder="Tên tác giả..."
                                class="input p-2 bg-gray-100 rounded-lg focus:border-primary w-full" required />
                        </div>


                        <div class="form-control md:col-span-2">
                            <label class="label pb-1"><span class="label-text font-semibold">Nhà xuất bản
                                    <span class="text-error">*</span></span></label>
                            <select v-model="formData.maNXB"
                                class="select select-bordered text-base-content rounded-lg focus:select-secondary w-full p-2"
                                required>
                                <option value="" disabled selected>Chọn một nhà xuất bản</option>
                                <option v-for="nxb in publishers" :key="nxb._id" :value="nxb._id">
                                    {{ nxb.tenNXB }}
                                </option>
                            </select>
                        </div>

                        <div class="form-control md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label class="label pb-1"><span class="label-text font-semibold">Năm XB</span></label>
                                <input type="number" v-model="formData.namXuatBan"
                                    class="input p-2 no-spinner bg-gray-100 rounded-lg w-full" />
                            </div>
                            <div>
                                <label class="label pb-1"><span class="label-text font-semibold text-primary">Số lượng
                                        <span class="text-error">*</span></span></label>
                                <input type="number" min="0" v-model="formData.soQuyen"
                                    class="input p-2 no-spinner bg-gray-100 rounded-lg border-primary w-full font-bold text-primary"
                                    required />
                            </div>
                            <div>
                                <label class="label pb-1"><span class="label-text font-semibold text-success">Đơn giá
                                        (VNĐ) <span class="text-error">*</span></span></label>
                                <input type="number" min="0" v-model="formData.donGia"
                                    class="input p-2 bg-gray-100 rounded-lg border-success w-full font-bold text-success no-spinner"
                                    required />
                            </div>
                        </div>
                    </div>

                    <div class="modal-action mt-8 border-t border-base-200 pt-6">
                        <button type="button" class="btn btn-ghost rounded-xl px-6"
                            @click="closeModal('book_form_modal')">Hủy bỏ</button>
                        <button type="submit"
                            class="btn btn-primary bg-accent rounded-xl px-7 text-base-content font-bold shadow-md"
                            :disabled="isSaving">
                            <span v-if="isSaving" class="loading loading-spinner"></span>
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

        <dialog id="delete_confirm_modal" class="modal">
            <div class="modal-box rounded-2xl">
                <h3 class="font-bold text-2xl text-error flex items-center gap-3">Cảnh báo xóa</h3>
                <p class="py-5 text-lg">Bạn có chắc chắn muốn xóa cuốn sách <span class="font-bold">"{{
                    bookToDelete?.tenSach }}"</span> không?</p>
                <div class="modal-action">
                    <button class="btn btn-ghost" @click="closeModal('delete_confirm_modal')">Hủy</button>
                    <button class="btn btn-error bg-error text-white px-3" @click="confirmDeleteBook"
                        :disabled="isSaving">Xóa
                        ngay</button>
                </div>
            </div>
        </dialog>

        <div v-if="toast.show" class="toast toast-end toast-bottom z-50">
            <div
                :class="['alert text-white shadow-xl font-medium rounded-xl', toast.type === 'success' ? 'alert-success' : 'alert-error']">
                <span>{{ toast.msg }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const books = ref([]);
const publishers = ref([]); // Danh sách NXB để chọn
const isLoading = ref(true);
const isSaving = ref(false);
const searchQuery = ref('');

const modalMode = ref('ADD');
const bookToDelete = ref(null);
const toast = ref({ show: false, msg: '', type: '' });

// Cập nhật maNXB thay vì nhaXuatBan chuỗi
const defaultForm = { tenSach: '', tacGia: '', maNXB: '', namXuatBan: '', soQuyen: 1, donGia: 0 };
const formData = ref({ ...defaultForm });

// --- LẤY DỮ LIỆU ---
const fetchPublishers = async () => {
    try {
        const res = await api.get('/publishers/all'); // Giả định route lấy danh sách NXB
        publishers.value = res.data.data || [];
    } catch (err) {
        console.error("Không lấy được danh sách NXB:", err);
    }
};

const fetchBooks = async () => {
    isLoading.value = true;
    try {
        const res = await api.get('/books');
        books.value = res.data.data || [];
    } catch (err) {
        // Mock dữ liệu có populate
        books.value = [
            { _id: '1', tenSach: 'Clean Code', tacGia: 'Robert C. Martin', soQuyen: 5, donGia: 250000, maNXB: { tenNXB: 'NXB Trẻ' } }
        ];
    } finally {
        isLoading.value = false;
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const filteredBooks = computed(() => {
    if (!searchQuery.value) return books.value;
    const q = searchQuery.value.toLowerCase();
    return books.value.filter(b => b.tenSach.toLowerCase().includes(q) || b.tacGia.toLowerCase().includes(q));
});

// --- MODAL CONTROLS ---
const openModal = (mode, book = null) => {
    modalMode.value = mode;
    if (mode === 'EDIT' && book) {
        // Nếu sửa, gán maNXB là ID của NXB hiện tại
        formData.value = { ...book, maNXB: book.maNXB?._id || book.maNXB };
    } else {
        formData.value = { ...defaultForm };
    }
    document.getElementById('book_form_modal').showModal();
};

const closeModal = (modalId) => document.getElementById(modalId).close();

const saveBook = async () => {
    isSaving.value = true;
    try {
        if (modalMode.value === 'ADD') {
            await api.post('/books', formData.value);
        } else {
            await api.patch(`/books/${formData.value._id}`, formData.value);
        }
        showToast('Thành công!', 'success');
        closeModal('book_form_modal');
        fetchBooks();
    } catch (error) {
        showToast('Lỗi khi lưu dữ liệu', 'error');
    } finally {
        isSaving.value = false;
    }
};

// ... Các hàm confirmDeleteBook và showToast giữ nguyên ...
const showToast = (msg, type) => {
    toast.value = { show: true, msg, type };
    setTimeout(() => toast.value.show = false, 3000);
};

const confirmDeleteBook = async () => {
    isSaving.value = true;
    try {
        await api.delete(`/books/${bookToDelete.value._id}`);
        showToast('Đã xóa sách thành công!', 'success');
        closeModal('delete_confirm_modal');
        fetchBooks();
    } catch (error) {
        showToast(error.response?.data?.message || 'Không thể xóa sách này.', 'error');
    } finally {
        isSaving.value = false;
    }
};

const openDeleteModal = (book) => {
    bookToDelete.value = book
    document.getElementById('delete_confirm_modal').showModal()
}

onMounted(() => {
    fetchBooks();
    fetchPublishers(); // Phải gọi hàm này để có data cho select box
});
</script>

<style>
/* Ẩn mũi tên tăng giảm trên input số */
input[type=number].no-spinner::-webkit-inner-spin-button,
input[type=number].no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number].no-spinner {
  -moz-appearance: textfield;
}
</style>