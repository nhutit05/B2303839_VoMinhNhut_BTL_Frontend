<template>
    <div class="container mx-auto px-4 py-8 min-h-screen animate-fade-in">

        <div class="mb-10">
            <h1 class="text-3xl font-bold text-primary mb-2">Quản lý Danh mục</h1>
            <p class="text-base-content/60 font-medium text-lg">
                Vui lòng chọn phân hệ danh mục bạn muốn thao tác và cập nhật dữ liệu.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-9 max-w-4xl">

            <RouterLink to="/books/manage"
                class="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer">
                <div class="card-body flex flex-row items-center gap-6 p-6">
                    <div
                        class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>

                    <div class="flex-1">
                        <h2 class="card-title text-2xl font-bold mb-1 group-hover:text-primary transition-colors">Sách
                        </h2>
                        <p class="text-base-content/60 font-medium text-sm line-clamp-2">
                            Quản lý kho sách, thêm mới, cập nhật số lượng và chi tiết các đầu sách trong thư viện.
                        </p>
                    </div>

                    <div
                        class="text-base-content/30 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </RouterLink>

            <RouterLink to="/publishers"
                class="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:border-secondary/30 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer">
                <div class="card-body flex flex-row items-center gap-6 p-6">
                    <div
                        class="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>

                    <div class="flex-1">
                        <h2 class="card-title text-2xl font-bold mb-1 group-hover:text-secondary transition-colors">Nhà
                            Xuất Bản</h2>
                        <p class="text-base-content/60 font-medium text-sm line-clamp-2">
                            Quản lý danh sách đối tác xuất bản, theo dõi thông tin liên hệ và địa chỉ phân phối.
                        </p>
                    </div>

                    <div
                        class="text-base-content/30 group-hover:text-secondary group-hover:translate-x-2 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </RouterLink>

        </div>
    </div>
</template>

<script setup>
// Vì trang này chỉ đảm nhiệm chức năng UI điều hướng tĩnh
// nên không cần khai báo logic đặc biệt trong script setup.
</script>