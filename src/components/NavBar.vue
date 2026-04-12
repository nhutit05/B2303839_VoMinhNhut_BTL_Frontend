<template>
    <div
        class="navbar bg-base-100 shadow-lg shadow-base-300 bg-opacity-90 backdrop-blur-sm fixed placeholder-primary z-10">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">Libverse Library</a>
        </div>
        <div class="flex-none ">
            <ul class="menu menu-horizontal px-1 font-bold">
                <RouterLink to="/">
                    <li><a>Trang chủ</a></li>
                </RouterLink>
                <RouterLink to="/books">
                    <li><a>Danh mục sách</a></li>
                </RouterLink>
                <RouterLink to="/history">
                    <li><a>Lịch sử mượn sách</a></li>
                </RouterLink>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-fit p-2 shadow">
                        <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge ml-7">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <RouterLink to="/login">
                            <li><a>Logout</a></li>
                        </RouterLink>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
