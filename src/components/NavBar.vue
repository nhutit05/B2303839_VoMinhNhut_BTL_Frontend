<template>
    <div class="navbar bg-base-100 shadow-lg shadow-base-300 bg-opacity-90 backdrop-blur-sm fixed placeholder-primary z-10">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Libverse Library</a>
        </div>
        <div class="flex-none">
            <!-- Thêm nút hamburger cho màn hình nhỏ -->
            <div class="dropdown dropdown-end lg:hidden">
                <label tabindex="0" class="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-fit p-2 shadow">
                    <li><RouterLink to="/">Trang chủ</RouterLink></li>
                    <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                        <RouterLink to="/categories">Quản lý danh mục</RouterLink>
                    </li>
                    <li v-else>
                        <RouterLink to="/books">Danh mục sách</RouterLink>
                    </li>
                    <li><RouterLink to="/policies">Chính sách thư viện</RouterLink></li>
                    <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                        <RouterLink to="/borrowings/manage">Quản lý Mượn Trả</RouterLink>
                    </li>
                    <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                        <RouterLink to="/admin/dashboard">Thống kê</RouterLink>
                    </li>
                    <li v-if="authStore.user && authStore.user.role === 'READER'">
                        <RouterLink to="/history">Lịch sử mượn sách</RouterLink>
                    </li>
                    <li v-if="!authStore.isLoggedIn">
                        <RouterLink to="/login">Đăng nhập</RouterLink>
                    </li>
                    <li v-else>
                        <RouterLink to="/" @click.prevent="logout">Đăng xuất</RouterLink>
                    </li>
                </ul>
            </div>

            <!-- Navbar menu cho màn hình lớn -->
            <ul class="menu menu-horizontal px-1 font-bold hidden lg:flex space-x-5 whitespace-nowrap"> <!-- Thêm whitespace-nowrap vào đây -->
                <li><RouterLink to="/">Trang chủ</RouterLink></li>

                <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                    <RouterLink to="/categories">Quản lý danh mục</RouterLink>
                </li>
                <li v-else>
                    <RouterLink to="/books">Danh mục sách</RouterLink>
                </li>

                <li><RouterLink to="/policies">Chính sách thư viện</RouterLink></li>

                <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                    <RouterLink to="/borrowings/manage">Quản lý Mượn Trả</RouterLink>
                </li>

                <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                    <RouterLink to="/admin/dashboard">Thống kê</RouterLink>
                </li>

                <li v-if="authStore.user && authStore.user.role === 'READER'">
                    <RouterLink to="/history">Lịch sử mượn sách</RouterLink>
                </li>

                <li v-if="!authStore.isLoggedIn">
                    <RouterLink to="/login">Đăng nhập</RouterLink>
                </li>

                <div class="dropdown dropdown-end ml-5" v-else>
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full bg-base-200 flex items-center justify-center text-base-content">
                            <img alt="avatar"
                                src="https://i.pinimg.com/236x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg" />
                        </div>
                    </div>
                    <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-fit p-2 shadow ">
                        <li><RouterLink to="/profile" class="flex items-center justify-between whitespace-nowrap">Thông tin cá nhân</RouterLink></li>
                        <li v-if="authStore.isLoggedIn">
                            <RouterLink to="/" @click.prevent="logout">Đăng xuất</RouterLink>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();
const logout = () => {
    authStore.logout();
    router.push('/login');
}
</script>

<style scoped>
/* Đảm bảo Navbar có đủ padding và không bị che khuất khi trên màn hình nhỏ */
.navbar {
    padding-left: 1rem;
    padding-right: 1rem;
}

@media (max-width: 1024px) {
    /* Sử dụng trong trường hợp cần điều chỉnh thêm cho các kích thước nhỏ hơn */
    .navbar {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
}
</style>