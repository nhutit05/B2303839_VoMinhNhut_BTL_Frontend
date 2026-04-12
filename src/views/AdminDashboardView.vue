<template>
  <div class="w-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-base-content tracking-tight">Tổng quan Thư viện</h1>
        <p class="text-base-content/60 mt-1">Hôm nay có gì mới không, Admin?</p>
      </div>
      <button @click="fetchThongKe" class="btn btn-primary shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Làm mới dữ liệu
      </button>
    </div>

    <div v-if="errorMessage" class="alert alert-error shadow-sm mb-6 text-white rounded-xl">
      <span>{{ errorMessage }}</span>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <span class="loading loading-dots loading-lg text-primary"></span>
    </div>

    <div v-else class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          class="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl transition-all hover:shadow-md"
        >
          <div class="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div class="stat-title text-base-content/70 font-medium">Tổng số đầu sách</div>
          <div class="stat-value text-primary">{{ statsData.tongSoSach || 0 }}</div>
          <div class="stat-desc">Trong kho thư viện</div>
        </div>

        <div
          class="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl transition-all hover:shadow-md"
        >
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div class="stat-title text-base-content/70 font-medium">Độc giả đăng ký</div>
          <div class="stat-value text-secondary">{{ statsData.tongSoDocGia || 0 }}</div>
          <div class="stat-desc">↗︎ 12 đăng ký mới tuần này</div>
        </div>

        <div
          class="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl transition-all hover:shadow-md"
        >
          <div class="stat-figure text-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div class="stat-title text-base-content/70 font-medium">Sách đang mượn</div>
          <div class="stat-value text-accent">{{ statsData.soSachDangMuon || 0 }}</div>
          <div class="stat-desc">Đang lưu hành bên ngoài</div>
        </div>

        <div
          class="stat bg-base-100 shadow-sm border border-error/30 rounded-2xl transition-all hover:shadow-md bg-error/5"
        >
          <div class="stat-figure text-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="stat-title text-error font-semibold">Phiếu quá hạn</div>
          <div class="stat-value text-error">{{ statsData.soPhieuQuaHan || 0 }}</div>
          <div class="stat-desc text-error font-medium">Cần xử lý ngay</div>
        </div>
      </div>

      <div
        class="card bg-base-100 shadow-sm border border-base-200 mt-8 rounded-2xl overflow-hidden"
      >
        <div class="card-body p-0">
          <div
            class="flex justify-between items-center p-6 border-b border-base-200 bg-base-100/50"
          >
            <h2 class="text-xl font-bold">Phiếu mượn cần theo dõi</h2>
            <RouterLink to="/admin/borrows" class="btn btn-sm btn-outline">Xem tất cả</RouterLink>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead class="bg-base-200/50 text-base-content text-sm">
                <tr>
                  <th>Mã phiếu</th>
                  <th>Độc giả</th>
                  <th>Số lượng sách</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-mono text-sm">#BRW-001</td>
                  <td>Nguyễn Văn A</td>
                  <td>2 cuốn</td>
                  <td><span class="badge badge-warning badge-sm gap-1">Đang mượn</span></td>
                  <td><button class="btn btn-ghost btn-xs">Chi tiết</button></td>
                </tr>
                <tr>
                  <td class="font-mono text-sm">#BRW-002</td>
                  <td>Trần Thị B</td>
                  <td>1 cuốn</td>
                  <td><span class="badge badge-error badge-sm gap-1">Quá hạn</span></td>
                  <td><button class="btn btn-ghost btn-xs text-error">Nhắc nhở</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const statsData = ref({})
const isLoading = ref(true)
const errorMessage = ref('')

const fetchThongKe = async () => {
  const token = localStorage.getItem('token')
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await api.get('/statistics', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data)

    statsData.value = response.data
  } catch (error) {
    console.error('Lỗi lấy thống kê:', error)
    errorMessage.value = 'Không thể tải dữ liệu. Vui lòng kiểm tra Server.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchThongKe()
})
</script>
