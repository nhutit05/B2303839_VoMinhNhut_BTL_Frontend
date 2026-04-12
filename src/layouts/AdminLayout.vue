<template>
  <div data-theme="emerald" class="drawer lg:drawer-open bg-base-200 min-h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col items-center justify-start">
      <div class="navbar bg-base-100 shadow-sm w-full z-10 px-4 md:px-8 border-b border-base-200">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-2" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <div class="flex-1">
          <div class="form-control w-full max-w-xs hidden md:block">
            <input
              type="text"
              placeholder="Tìm kiếm sách, độc giả..."
              class="input input-bordered input-sm w-full rounded-full bg-base-200/50 focus:bg-base-100 transition-colors"
            />
          </div>
        </div>

        <div class="flex-none gap-4">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge badge-xs badge-error indicator-item"></span>
            </div>
          </button>

          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div
                class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold"
              >
                AD
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li class="menu-title px-4 py-2">
                <span class="font-bold text-base-content">Admin Libverse</span>
                <span class="text-xs font-normal">admin@libverse.com</span>
              </li>
              <div class="divider my-0"></div>
              <li><a>Cài đặt tài khoản</a></li>
              <li><a @click="handleLogout" class="text-error font-medium">Đăng xuất</a></li>
            </ul>
          </div>
        </div>
      </div>

      <main class="w-full p-4 md:p-8 flex-1">
        <RouterView />
      </main>
    </div>

    <div class="drawer-side z-20 shadow-xl lg:shadow-none">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <div
        class="menu p-4 w-72 h-full bg-base-100 text-base-content border-r border-base-200 flex flex-col"
      >
        <div class="flex items-center gap-3 px-4 py-4 mb-6">
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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
          <span class="text-2xl font-black text-primary tracking-tight">Libverse</span>
        </div>

        <ul class="space-y-2 flex-1 font-medium">
          <li>
            <RouterLink
              to="/admin/dashboard"
              class="py-3 rounded-lg"
              active-class="active bg-primary text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Tổng Quan
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/books"
              class="py-3 rounded-lg"
              active-class="active bg-primary text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
              Quản lý Sách
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/readers"
              class="py-3 rounded-lg"
              active-class="active bg-primary text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Quản lý Độc Giả
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/borrows"
              class="py-3 rounded-lg"
              active-class="active bg-primary text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              Phiếu Mượn / Trả
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
