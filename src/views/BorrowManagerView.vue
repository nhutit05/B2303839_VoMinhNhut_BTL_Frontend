<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">

        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
            <div>
                <h1 class="text-3xl font-bold text-primary">Quản lý Mượn Trả</h1>
                <p class="text-base-content/60 mt-1 font-medium">Theo dõi và cập nhật trạng thái mượn trả sách của độc
                    giả</p>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">

                <!-- FILTER -->
                <label class="form-control w-full sm:w-56">
                    <div class="label py-1">
                        <span class="label-text text-sm text-base-content/70 font-medium">
                            Trạng thái
                        </span>
                    </div>

                    <select v-model="filterStatus"
                        class="select select-bordered p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 rounded-lg">
                        <option value="Tất cả">Tất cả</option>
                        <option value="Đang mượn">Đang mượn</option>
                        <option value="Quá hạn">Quá hạn</option>
                        <option value="Đã trả">Đã trả</option>
                    </select>

                </label>

                <!-- SEARCH -->
                <label class="form-control w-full sm:w-80">
                    <div class="label py-1">
                        <span class="label-text text-sm text-base-content/70 font-medium">
                            Tìm kiếm
                        </span>
                    </div>

                    <div class="join w-full shadow-sm rounded-xl overflow-hidden border border-base-200 bg-base-100
                    focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-200">

                        <input v-model="searchQuery" type="text" placeholder="Tên sách, độc giả..."
                            class="input input-bordered p-2 w-full border-0 focus:outline-none rounded-l-lg" />

                        <button class="btn btn-primary btn-square rounded-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </label>

            </div>
        </div>

        <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden rounded-2xl">
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else-if="records.length > 0" class="overflow-x-auto">
                <table class="table table-zebra w-full text-base">
                    <thead class="bg-base-200 text-base-content text-sm uppercase tracking-wider">
                        <tr>
                            <th class="py-5 pl-6 font-bold">Độc Giả</th>
                            <th class="py-5 font-bold">Tên Sách</th>
                            <th class="py-5 font-bold text-center">Ngày Mượn</th>
                            <th class="py-5 font-bold text-center">Hạn Trả</th>
                            <th class="py-5 font-bold text-center">Đã Nhận Sách</th>
                            <th class="py-5 font-bold text-center">Trạng Thái</th>
                            <th class="py-5 font-bold text-center">Tiền Phạt</th>
                            <th class="py-5 pr-6 font-bold text-center">Thao tác</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in filteredRecords" :key="record._id"
                            class="hover:bg-base-200/50 border-b border-base-200 transition-colors">

                            <td class="pl-6 py-4">
                                <div class="font-bold text-base-content">
                                    {{ record.maDocGia?.hoLot }} {{ record.maDocGia?.ten }}
                                </div>
                                <div class="text-sm text-base-content/60">{{ record.maDocGia?.email || 'N/A' }}</div>
                            </td>

                            <td class="py-4">
                                <div class="font-semibold">{{ record.maSach?.tenSach }}</div>
                            </td>

                            <td class="text-center py-4">{{ formatDate(record.ngayMuon) }}</td>
                            <td class="text-center py-4 font-medium">{{ formatDate(record.hanTra) }}</td>

                            <td class="text-center py-4">
                                <div class="badge font-semibold gap-1" :class="getStatusBadgeClass(record.trangThai)">
                                    {{ record.trangThaiNhan }}
                                </div>
                            </td>

                            <td class="text-center py-4">
                                <div class="badge font-semibold gap-1" :class="getStatusBadgeClass(record.trangThai)">
                                    {{ record.trangThai }}
                                </div>
                            </td>

                            <td class="text-right py-4 font-bold"
                                :class="record.tienPhat > 0 ? 'text-error' : 'text-base-content/50'">
                                {{ record.tienPhat > 0 ? record.tienPhat.toLocaleString() + ' đ' : '-' }}
                            </td>


                            <td class="pr-6 py-4 text-right">
                                <div class="flex justify-end gap-2">

                                    <!-- Nhận sách -->
                                    <button v-if="record.trangThai !== 'Đã trả' && record.trangThaiNhan !== 'Đã nhận'"
                                        @click="openReceiveModal(record)" class="btn btn-circle btn-success btn-sm"
                                        title="Nhận sách">
                                        <!-- check icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </button>

                                    <!-- Trả sách -->
                                    <button v-if="record.trangThai !== 'Đã trả' && record.trangThaiNhan === 'Đã nhận'" @click="openReturnModal(record)"
                                        class="btn btn-circle btn-primary btn-sm" title="Trả sách">
                                        <!-- return/refresh icon -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 4v5h.582M20 20v-5h-.581M5.07 19A9 9 0 1019 5.07" />
                                        </svg>
                                    </button>

                                </div>
                            </td>
                            
                        </tr>

                        <tr v-if="filteredRecords.length === 0">
                            <td colspan="7" class="text-center py-8 text-base-content/60 font-medium">
                                Không tìm thấy phiếu mượn nào phù hợp với bộ lọc.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="flex justify-center items-center h-64 text-base-content/60 font-medium">
                Chưa có dữ liệu mượn trả nào trong hệ thống.
            </div>
        </div>

        <dialog id="return_confirm_modal" class="modal">
            <div class="modal-box rounded-2xl border-t-4 border-success">
                <h3 class="font-bold text-2xl text-success flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Xác nhận trả sách
                </h3>
                <p class="py-5 text-lg">
                    Xác nhận độc giả <span class="font-bold text-primary">{{ recordToReturn?.maDocGia?.hoLot }} {{
                        recordToReturn?.maDocGia?.ten }}</span>
                    đã trả lại cuốn <span class="font-bold text-primary">"{{ recordToReturn?.maSach?.tenSach }}"</span>?
                </p>
                <div class="modal-action">
                    <button class="btn btn-ghost rounded-xl" @click="closeModal('return_confirm_modal')">Hủy</button>
                    <button class="btn btn-success bg-success text-white px-5 rounded-xl shadow-md"
                        @click="confirmReturnBook" :disabled="isSaving">
                        <span v-if="isSaving" class="loading loading-spinner"></span>
                        Xác nhận đã trả
                    </button>
                </div>
            </div>
        </dialog>

        <dialog id="receive_confirm_modal" class="modal">
            <div class="modal-box rounded-2xl border-t-4 border-success">
                <h3 class="font-bold text-2xl text-success flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Xác nhận nhận sách
                </h3>
                <p class="py-5 text-lg">
                    Xác nhận độc giả <span class="font-bold text-primary">{{ recordToReceive?.maDocGia?.hoLot }} {{
                        recordToReceive?.maDocGia?.ten }}</span>
                    đã nhận cuốn <span class="font-bold text-primary">"{{ recordToReceive?.maSach?.tenSach }}"</span>?
                </p>
                <div class="modal-action">
                    <button class="btn btn-ghost rounded-xl" @click="closeModal('receive_confirm_modal')">Hủy</button>
                    <button class="btn btn-success bg-success text-white px-5 rounded-xl shadow-md"
                        @click="confirmReceiveBook" :disabled="isSaving">
                        <span v-if="isSaving" class="loading loading-spinner"></span>
                        Xác nhận đã nhận
                    </button>
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

// --- TRẠNG THÁI (STATE) ---
const records = ref([]);
const isLoading = ref(false);
const isSaving = ref(false);

// Tìm kiếm và Lọc
const searchQuery = ref('');
const filterStatus = ref('Đang mượn'); // Mặc định hiển thị sách Đang mượn

// Modal & Toast
const recordToReturn = ref(null);
const recordToReceive = ref(null);
const toast = ref({ show: false, msg: '', type: '' });

// --- LẤY DỮ LIỆU ---
const fetchBorrowRecords = async () => {
    isLoading.value = true;
    try {
        // Giả định backend trả về dữ liệu đã được populate()
        const res = await api.get('/borrowings/all');
        records.value = res.data.data || res.data || [];
    } catch (err) {
        console.error("Không lấy được danh sách mượn trả:", err);
        showToast('Không thể tải dữ liệu mượn trả.', 'error');
    } finally {
        isLoading.value = false;
    }
};

// --- LOGIC LỌC DỮ LIỆU (COMPUTED) ---
const filteredRecords = computed(() => {
    let result = records.value;

    // 1. Lọc theo trạng thái
    if (filterStatus.value !== 'Tất cả') {
        result = result.filter(r => r.trangThai === filterStatus.value);
    }

    // 2. Lọc theo từ khóa (nếu có)
    if (searchQuery.value) {
        const q = normalize(searchQuery.value);
        result = result.filter(r => {
            const tenDocGia = normalize(`${r.maDocGia?.hoLot || ''} ${r.maDocGia?.ten || ''}`);
            const tenSach = normalize(r.maSach?.tenSach || '');
            return tenDocGia.includes(q) || tenSach.includes(q);
        });
    }

    return result;
});

// --- MODAL CONTROLS ---
const openReturnModal = (record) => {
    recordToReturn.value = record;
    document.getElementById('return_confirm_modal').showModal();
};

const openReceiveModal = (record) => {
    recordToReceive.value = record;
    document.getElementById('receive_confirm_modal').showModal();
};
const closeModal = (modalId) => document.getElementById(modalId).close();

// --- XỬ LÝ TRẢ SÁCH ---
const confirmReturnBook = async () => {
    isSaving.value = true;
    try {
        // Cập nhật trạng thái thành "Đã trả" thông qua API
        await api.patch(`/borrowings/${recordToReturn.value._id}/return`);

        showToast('Đã xác nhận trả sách thành công!', 'success');
        closeModal('return_confirm_modal');
        fetchBorrowRecords(); // Tải lại danh sách
    } catch (error) {
        showToast(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái trả sách.', 'error');
    } finally {
        isSaving.value = false;
    }
};

const confirmReceiveBook = async () => {
    isSaving.value = true;
    try {
        // Cập nhật trạng thái thành "Đã nhận" thông qua API
        await api.patch(`/borrowings/${recordToReceive.value._id}/receive`);

        showToast('Đã xác nhận nhận sách thành công!', 'success');
        closeModal('receive_confirm_modal');
        fetchBorrowRecords(); // Tải lại danh sách
    } catch (error) {
        showToast(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái nhận sách.', 'error');
    } finally {
        isSaving.value = false;
    }
};
// --- CÁC HÀM TIỆN ÍCH (HELPERS) ---
const showToast = (msg, type) => {
    toast.value = { show: true, msg, type };
    setTimeout(() => toast.value.show = false, 3000);
};

const normalize = (str) =>
    (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN');
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Đang mượn': return 'badge-info badge-outline';
        case 'Đã trả': return 'badge-success badge-outline';
        case 'Quá hạn': return 'badge-error text-white border-none';
        default: return 'badge-ghost';
    }
};

const currentExtendingId = ref(null); // để hiển thị loading riêng cho từng nút

const extendBorrow = async (record) => {
    isSaving.value = true;
    currentExtendingId.value = record._id;
    try {
        await api.patch(`/borrow/${record._id}/extend`);
        showToast('Gia hạn mượn sách thành công (+7 ngày)!', 'success');
        fetchBorrowRecords(); // reload danh sách
    } catch (error) {
        showToast(
            error.response?.data?.message || 'Lỗi khi gia hạn mượn sách.',
            'error'
        );
    } finally {
        isSaving.value = false;
        currentExtendingId.value = null;
    }
};

// --- LIFECYCLE ---
onMounted(() => {
    fetchBorrowRecords();
});
</script>