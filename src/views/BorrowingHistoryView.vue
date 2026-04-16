<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-primary">Lịch sử mượn sách</h1>
            <p class="text-base-content/60 mt-2">Theo dõi chi tiết quá trình mượn, trả và trạng thái sách của bạn.</p>
        </div>

        <div class="card bg-base-200/60 border border-base-200 shadow-md mb-8 rounded-2xl">
            <div class="card-body p-6 md:p-8">
                <h3 class="font-bold text-lg mb-4 flex items-center gap-2 text-base-content/80">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Bộ lọc tìm kiếm
                </h3>

                <div class="flex flex-col md:flex-row gap-6 items-end">
                    <div class="form-control w-full md:flex-1">
                        <label class="label pt-0"><span class="label-text font-medium">Trạng thái phiếu</span></label>
                        <select v-model="filterStatus"
                            class="select select-bordered w-full bg-base-100 focus:select-primary transition-colors">
                            <option value="Tất cả">Tất cả trạng thái</option>
                            <option value="Đang mượn">Đang mượn</option>
                            <option value="Đã trả">Đã trả</option>
                            <option value="Quá hạn">Quá hạn</option>
                        </select>
                    </div>

                    <div class="form-control w-full md:flex-1">
                        <label class="label pt-0"><span class="label-text font-medium">Mượn từ ngày</span></label>
                        <input type="date" v-model="startDate"
                            class="input input-bordered w-full bg-base-100 focus:input-primary transition-colors" />
                    </div>

                    <div class="form-control w-full md:flex-1">
                        <label class="label pt-0"><span class="label-text font-medium">Đến ngày</span></label>
                        <input type="date" v-model="endDate"
                            class="input input-bordered w-full bg-base-100 focus:input-primary transition-colors" />
                    </div>

                    <div class="form-control w-full md:w-auto mt-4 md:mt-0">
                        <button @click="clearFilters"
                            class="btn btn-outline hover:bg-base-300 hover:text-base-content border-base-300 w-full md:w-32 transition-all"
                            :disabled="!isFiltering">
                            Xóa lọc
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden rounded-2xl">
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else-if="filteredHistory.length > 0" class="overflow-x-auto">
                <table class="table table-zebra w-full text-base">
                    <thead class="bg-primary text-primary-content text-sm uppercase">
                        <tr>
                            <th class="font-bold py-5 pl-6">Tên sách</th>
                            <th class="font-bold py-5 text-center">Ngày mượn</th>
                            <th class="font-bold py-5 text-center">Hạn trả</th>
                            <th class="font-bold py-5 text-center">Ngày trả</th>
                            <th class="font-bold py-5 text-center">Trạng thái</th>
                            <th class="font-bold py-5 text-right pr-6">Tiền phạt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="record in filteredHistory" :key="record._id"
                            class="hover border-b border-base-200 transition-colors">
                            <td class="font-medium pl-6">
                                {{ record.maSach?.tenSach || record.sach?.tenSach || 'Sách không xác định' }}
                            </td>
                            <td class="text-center">{{ formatDate(record.ngayMuon) }}</td>
                            <td class="text-center font-medium">{{ formatDate(record.hanTra) }}</td>
                            <td class="text-center" :class="{ 'text-base-content/40 italic': !record.ngayTra }">
                                {{ record.ngayTra ? formatDate(record.ngayTra) : '---' }}
                            </td>
                            <td class="text-center">
                                <div
                                    :class="['badge font-bold badge-md py-3 shadow-sm', getStatusClass(record.trangThai)]">
                                    {{ record.trangThai }}
                                </div>
                            </td>
                            <td class="text-right pr-6 font-semibold"
                                :class="record.tienPhat > 0 ? 'text-error' : 'text-base-content/50'">
                                {{ record.tienPhat > 0 ? formatCurrency(record.tienPhat) : '0 ₫' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="text-center py-24 px-4 bg-base-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-base-content/20 mb-4" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p class="text-xl font-bold text-base-content/70">Không tìm thấy bản ghi nào.</p>
                <p class="text-base text-base-content/50 mt-2" v-if="isFiltering">Thử thay đổi điều kiện lọc hoặc xóa bộ
                    lọc để xem lại.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

const isLoading = ref(true);
const historyData = ref([]);

// --- BIẾN TRẠNG THÁI BỘ LỌC ---
// Đã khớp với Enum của Backend: "Đang mượn", "Đã trả", "Quá hạn"
const filterStatus = ref('Tất cả');
const startDate = ref('');
const endDate = ref('');

// Kiểm tra xem người dùng có đang dùng bộ lọc nào không
const isFiltering = computed(() => {
    return filterStatus.value !== 'Tất cả' || startDate.value !== '' || endDate.value !== '';
});

// --- LẤY DỮ LIỆU TỪ BACKEND ---
const fetchHistory = async () => {
    isLoading.value = true;
    try {
        // API Cập nhật theo yêu cầu của bạn
        const res = await api.get('/borrowings/history');

        // Đảm bảo dữ liệu là mảng
        historyData.value = res.data.data || [];
    } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
        // Dữ liệu giả lập test giao diện (sử dụng đúng tên trường của Mongoose Schema)
        historyData.value = [
            { _id: '1', maSach: { tenSach: 'Clean Code' }, ngayMuon: '2024-04-01T00:00:00.000Z', hanTra: '2024-04-15T00:00:00.000Z', ngayTra: '2024-04-10T00:00:00.000Z', trangThai: 'Đã trả', tienPhat: 0 },
            { _id: '2', maSach: { tenSach: 'Sapiens: Lược sử loài người' }, ngayMuon: '2024-04-10T00:00:00.000Z', hanTra: '2024-04-24T00:00:00.000Z', ngayTra: null, trangThai: 'Đang mượn', tienPhat: 0 },
            { _id: '3', maSach: { tenSach: 'Nhà giả kim' }, ngayMuon: '2024-03-01T00:00:00.000Z', hanTra: '2024-03-15T00:00:00.000Z', ngayTra: null, trangThai: 'Quá hạn', tienPhat: 25000 },
        ];
    } finally {
        isLoading.value = false;
    }
};

// --- LOGIC LỌC VÀ SẮP XẾP ---
const filteredHistory = computed(() => {
    let result = [...historyData.value];

    // 1. Lọc theo trạng thái
    if (filterStatus.value !== 'Tất cả') {
        result = result.filter(item => item.trangThai === filterStatus.value);
    }

    // 2. Lọc theo khoảng thời gian (Từ ngày - Đến ngày)
    if (startDate.value) {
        const start = new Date(startDate.value).getTime();
        result = result.filter(item => new Date(item.ngayMuon).getTime() >= start);
    }

    if (endDate.value) {
        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);
        result = result.filter(item => new Date(item.ngayMuon).getTime() <= end.getTime());
    }

    // 3. Mặc định Sắp xếp: Thời gian mượn MỚI NHẤT lên đầu
    return result.sort((a, b) => new Date(b.ngayMuon) - new Date(a.ngayMuon));
});

// Xóa tất cả bộ lọc
const clearFilters = () => {
    filterStatus.value = 'Tất cả';
    startDate.value = '';
    endDate.value = '';
};

// --- CÁC HÀM TIỆN ÍCH (HELPERS) ---

// Format ngày tháng (VD: 15/04/2024)
const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Format Tiền tệ VNĐ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Đổi màu Badge tùy theo trạng thái tiếng Việt
const getStatusClass = (status) => {
    const map = {
        'Đang mượn': 'bg-info/20 text-info border-info/30', // Xanh dương nhẹ
        'Đã trả': 'bg-success text-white border-success',    // Xanh lá
        'Quá hạn': 'bg-error text-white border-error'        // Đỏ
    };
    return map[status] || 'badge-ghost';
};

onMounted(() => {
    fetchHistory();
});
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
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