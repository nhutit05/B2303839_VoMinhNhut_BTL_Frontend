<template>
  <div data-theme="emerald" class="min-h-screen bg-base-100 p-4 md:p-8 animate-fade-in">
    <div class="container mx-auto max-w-6xl">
      
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Thống Kê Tổng Quan
        </h1>
        <p class="text-base-content/60 font-medium text-lg">
          Theo dõi các chỉ số hoạt động và tình trạng của thư viện.
        </p>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <span class="loading loading-bars loading-lg text-primary"></span>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300">
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-base-content/70">Tổng Số Độc Giả</div>
              <div class="stat-value text-primary">{{ formatNumber(stats.tongSoDocGia) }}</div>
            </div>
          </div>

          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300">
            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-base-content/70">Tổng Số Đầu Sách</div>
              <div class="stat-value text-secondary">{{ formatNumber(stats.tongSoSach) }}</div>
            </div>
          </div>

          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300">
            <div class="stat">
              <div class="stat-figure text-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-base-content/70">Sách Còn Trong Kho</div>
              <div class="stat-value text-success">{{ formatNumber(stats.soSachTrongKho) }}</div>
            </div>
          </div>

          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300">
            <div class="stat">
              <div class="stat-figure text-info">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-base-content/70">Phiếu Đang Mượn</div>
              <div class="stat-value text-info">{{ formatNumber(stats.soSachDangMuon) }}</div>
            </div>
          </div>

          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300 bg-error/5">
            <div class="stat">
              <div class="stat-figure text-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-error/80">Sách Quá Hạn</div>
              <div class="stat-value text-error">{{ formatNumber(stats.soSachQuaHan) }}</div>
            </div>
          </div>

          <div class="stats shadow border border-base-200 hover:-translate-y-1 transition-transform duration-300 bg-warning/10">
            <div class="stat">
              <div class="stat-figure text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="stat-title font-semibold text-warning-content/70">Tổng Tiền Phạt</div>
              <div class="stat-value text-warning text-3xl">{{ formatCurrency(stats.tongTienPhat) }}</div>
            </div>
          </div>

        </div>

        <div class="card bg-base-100 shadow-xl border border-base-200">
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold text-neutral mb-4 border-b pb-2">
              Tương quan Trạng thái Sách
            </h2>
            
            <div class="h-80 w-full relative">
              <Bar :data="chartData" :options="chartOptions" />
            </div>
            
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';

// --- IMPORT CÁC THÀNH PHẦN CỦA CHART.JS ---
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Đăng ký các module cần thiết của ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// --- STATE ---
const stats = ref({
  soSachDangMuon: 0,
  soSachQuaHan: 0,
  tongSoDocGia: 0,
  tongSoSach: 0,
  soSachTrongKho: 0,
  tongTienPhat: 0
});

const isLoading = ref(true);

// --- API CALL ---
const fetchStats = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/statistics'); 
    if (res.data && res.data.data) {
      stats.value = res.data.data;
    } else {
      stats.value = res.data;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu thống kê:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- CHART CONFIGURATION ---
// Dùng computed để biểu đồ tự động render lại khi `stats.value` thay đổi
const chartData = computed(() => ({
  labels: ['Sách Cố Sẵn Trong Kho', 'Sách Đang Mượn', 'Sách Quá Hạn'],
  datasets: [
    {
      label: 'Số lượng (Quyển)',
      data: [
        stats.value.soSachTrongKho, 
        stats.value.soSachDangMuon, 
        stats.value.soSachQuaHan
      ],
      // Màu sắc đồng bộ với theme emerald (Success, Info, Error)
      backgroundColor: [
        '#10b981', // Xanh lá
        '#3abff8', // Xanh dương
        '#f87272'  // Đỏ
      ],
      borderRadius: 6, // Bo góc các cột cho hiện đại
      barPercentage: 0.5 // Độ rộng của cột
    }
  ]
}));

// Tùy chỉnh biểu đồ
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Bắt buộc false để chart vừa vặn với thẻ div.h-80 bao quanh
  plugins: {
    legend: {
      display: false // Ẩn chú giải vì trục X đã ghi rõ
    },
    tooltip: {
      padding: 12,
      titleFont: { size: 14 },
      bodyFont: { size: 14 }
    }
  },
  scales: {
    y: {
      beginAtZero: true, // Trục Y luôn bắt đầu từ 0
      ticks: {
        precision: 0 // Không hiển thị số thập phân ở trục Y
      }
    }
  }
};

// --- HELPERS ---
const formatNumber = (num) => (num || 0).toLocaleString('vi-VN');
const formatCurrency = (amount) => (amount || 0).toLocaleString('vi-VN') + ' đ';

// --- LIFECYCLE ---
onMounted(() => {
  fetchStats();
});
</script>