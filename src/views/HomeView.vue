<template>
  <div class="min-h-screen bg-base-100 animate-fade-in pb-12">

    <div class="hero min-h-[50vh] bg-base-200/50 border-b border-base-200">
      <div class="hero-content text-center py-16">
        <div class="max-w-3xl">
          <div
            class="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wider uppercase">
            Hệ thống quản lý thư viện số
          </div>
          <h1 class="text-4xl md:text-5xl font-black text-base-content mb-6 leading-tight">
            Chào mừng <span class="text-primary">{{ fullName }}</span> <br />
            đến với <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Libverse
              Library</span>
          </h1>
          <p class="py-4 text-lg text-base-content/70">
            Khám phá tri thức nhân loại với hàng ngàn đầu sách đa dạng. Libverse mang đến trải nghiệm đọc sách thông
            minh, nhanh chóng và hoàn toàn tự động dành cho bạn.
          </p>

          <div class="flex gap-4 justify-center mt-6">
            <RouterLink v-if="role === 'ADMIN'" to="/" class="btn btn-primary btn-lg text-white shadow-xl">
              Vào trang Quản trị
            </RouterLink>

            <RouterLink v-else-if="role === 'READER'" to="/books" class="btn btn-primary btn-lg text-white shadow-xl">
              Khám phá Kho Sách
            </RouterLink>

            <RouterLink v-else to="/login" class="btn btn-primary btn-lg text-white shadow-xl">
              Đăng nhập ngay
            </RouterLink>

          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold">Tại sao chọn Libverse?</h2>
        <p class="text-base-content/60 mt-2">Nền tảng thư viện hiện đại được thiết kế vì trải nghiệm của bạn.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
          <div class="card-body items-center text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="card-title">Kho sách khổng lồ</h3>
            <p class="text-base-content/70">Hơn 10,000+ đầu sách từ nhiều lĩnh vực như Công nghệ, Văn học, Khoa học,...
            </p>
          </div>
        </div>

        <div class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
          <div class="card-body items-center text-center">
            <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="card-title">Mượn sách 1 chạm</h3>
            <p class="text-base-content/70">Thao tác mượn trả tự động hóa. Đặt trước sách dễ dàng chỉ với một nút bấm.
            </p>
          </div>
        </div>

        <div class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
          <div class="card-body items-center text-center">
            <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="card-title">Quản lý thông minh</h3>
            <p class="text-base-content/70">Theo dõi lịch sử đọc, nhận nhắc nhở trả sách tự động để tránh bị quá hạn.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-end mb-8 max-w-6xl mx-auto">
        <div>
          <h2 class="text-3xl font-bold">Sách nổi bật tuần này</h2>
          <p class="text-base-content/60 mt-1">Những cuốn sách được mượn nhiều nhất bởi cộng đồng Libverse.</p>
        </div>

        <RouterLink v-if="role === 'READER'" to="/books" class="btn btn-ghost text-primary hidden md:flex">
          Xem tất cả <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div v-for="book in mockFeaturedBooks" :key="book.id"
          class="card bg-base-100 shadow-xl border border-base-200 group overflow-hidden">
          <figure class="bg-base-200 h-56 relative flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-base-300 group-hover:scale-110 transition-transform duration-300" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>

            <div class="absolute top-3 right-3 badge badge-primary badge-sm font-bold shadow-sm">
              {{ book.rating }} ⭐
            </div>
          </figure>
          <div class="card-body p-5">
            <div class="badge badge-outline text-xs mb-2">{{ book.category }}</div>
            <h3 class="card-title text-base leading-snug">{{ book.title }}</h3>
            <p class="text-sm text-base-content/60">{{ book.author }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

// Lấy dữ liệu user trực tiếp từ LocalStorage
const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

// Xử lý hiển thị Tên
const fullName = computed(() => {
  if (user && user.ten) {
    return `${user.hoLot || ''} ${user.ten}`.trim();
  }
  return 'bạn'; // Mặc định nếu chưa đăng nhập
});

// Phân luồng điều hướng
const role = computed(() => {
  return user?.role || 'GUEST';
});

// DỮ LIỆU GIẢ LẬP (MOCK DATA)
const mockFeaturedBooks = [
  { id: 1, title: 'Clean Code: Cẩm nang Agile', author: 'Robert C. Martin', category: 'Công nghệ IT', rating: '4.9' },
  { id: 2, title: 'Sapiens: Lược sử loài người', author: 'Yuval Noah Harari', category: 'Khoa học - Lịch sử', rating: '4.8' },
  { id: 3, title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Tâm lý học', rating: '4.7' },
  { id: 4, title: 'Bàn Về Nghệ Thuật Sống', author: 'Lâm Ngữ Đường', category: 'Triết học', rating: '4.9' }
];
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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