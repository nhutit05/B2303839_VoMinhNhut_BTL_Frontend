<template>
    <div
        class="navbar bg-base-100 shadow-lg shadow-base-300 bg-opacity-90 backdrop-blur-sm fixed placeholder-primary z-10">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Libverse Library</a>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1 font-bold">
                <li>
                    <RouterLink to="/">Trang chủ</RouterLink>
                </li>

                <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                    <RouterLink to="/categories">Quản lý danh mục</RouterLink>
                </li>
                <li v-else>
                    <RouterLink to="/books">Danh mục sách</RouterLink>
                </li>

                <li v-if="authStore.user && authStore.user.role === 'ADMIN'">
                    <RouterLink to="/borrowings/manage">Quản lý Mượn Trả</RouterLink>
                </li>



                <li v-if="!authStore.isLoggedIn">
                    <RouterLink to="/login">Đăng nhập</RouterLink>
                </li>

                <div class="dropdown dropdown-end" v-else>
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full bg-base-200 flex items-center justify-center text-base-content">
                            <img alt="avatar"
                                src="https://i.pinimg.com/236x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg" />
                        </div>
                    </div>



                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-fit p-2 shadow ">

                        <li>
                            <RouterLink to="/profile" class="flex items-center justify-between whitespace-nowrap">
                                <span class="whitespace-nowrap">Thông tin cá nhân</span>
                            </RouterLink>
                        </li>

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
