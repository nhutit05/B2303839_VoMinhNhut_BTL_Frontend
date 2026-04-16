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

                <li>
                    <RouterLink to="/books">Danh mục sách</RouterLink>
                </li>

                <li v-if="authStore.user && authStore.user.role === 'READER'">
                    <RouterLink to="/history">Lịch sử mượn sách</RouterLink>
                </li>

                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="avatar"
                                src="https://i.pinimg.com/236x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg" />
                        </div>
                    </div>

                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-fit p-2 shadow ">

                        <li>
                            <RouterLink to="/profile" class="justify-between">
                                Profile
                                <span class="badge ml-7">New</span>
                            </RouterLink>
                        </li>

                        <!-- <li>
                            <RouterLink to="/" @click="logout">
                                Logout
                            </RouterLink>
                        </li> -->
                        <li v-if="authStore.isLoggedIn">
                            <RouterLink to="/" @click.prevent="logout">Logout</RouterLink>
                        </li>
                        <li v-else>
                            <RouterLink to="/login">Login</RouterLink>
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
