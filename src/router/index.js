// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/login',
//       name: 'login',
//       component: () => import('../views/LoginView.vue'),
//       meta: { requiresGuest: true },
//     },
//     {
//       path: '/books',
//       name: 'books',
//       component: () => import('../views/BookListView.vue'),
//       meta: { requiresAuth: false, role: 'READER' },
//     },
//     {
//       path: '/history',
//       name: 'history',
//       component: () => import('../views/BorrowingHistoryView.vue'),
//       meta: { requiresAuth: true, role: 'READER' },
//     },
//     {
//       path: '/',
//       name: 'home',
//       component: () => import('../views/HomeView.vue'),
//     },
//     {
//       path: '/',
//     },
//   ],
// })

// router.beforeEach((to, from, next) => {
//   // 1. Lấy thông tin từ LocalStorage (Đã lưu lúc đăng nhập)
//   const token = localStorage.getItem('token')
//   const userString = localStorage.getItem('user')
//   const user = userString ? JSON.parse(userString) : null
//   const userRole = user?.role // 'ADMIN' hoặc 'READER'

//   // 2. Nếu route yêu cầu đăng nhập (requiresAuth)
//   if (to.meta.requiresAuth) {
//     if (!token || !user) {
//       // Chưa đăng nhập -> Đuổi về trang login
//       return next({ name: 'login' })
//     }

//     // Đã đăng nhập nhưng sai Role (VD: Reader đòi vào link /admin/dashboard)
//     if (to.meta.role && to.meta.role !== userRole) {
//       // Đẩy về đúng trang chủ của role đó
//       if (userRole === 'ADMIN') {
//         return next({ name: 'home' })
//       } else {
//         return next({ name: 'home' })
//       }
//     }
//   }

//   // 3. Nếu đang ở Login nhưng đã đăng nhập rồi (requiresGuest)
//   if (to.meta.requiresGuest && token && user) {
//     if (userRole === 'ADMIN') {
//       return next({ name: 'home' })
//     } else {
//       return next({ name: 'user-dashboard' })
//     }
//   }

//   // 4. Nếu qua hết các ải trên, cho phép đi tiếp
//   next()
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      // Trang chủ ai cũng vào được (kể cả chưa đăng nhập)
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BookListView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/BorrowingHistoryView.vue'),
      meta: { requiresAuth: true, role: 'READER' },
    },
    // ---- THÊM ROUTE PROFILE TẠI ĐÂY ----
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      // Chỉ cần đăng nhập là vào được, không phân biệt Role
      meta: { requiresAuth: true },
    },
  ],
})

// TRẠM KIỂM SOÁT BẢO MẬT (Navigation Guard)
router.beforeEach((to, from, next) => {
  // 1. Lấy thông tin từ LocalStorage
  const token = localStorage.getItem('token')
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const userRole = user?.role // 'ADMIN' hoặc 'READER'

  // 2. Nếu route YÊU CẦU ĐĂNG NHẬP (requiresAuth)
  if (to.meta.requiresAuth) {
    if (!token || !user) {
      // Chưa đăng nhập -> Đuổi về trang login
      return next({ name: 'login' })
    }

    // Đã đăng nhập nhưng sai Role (VD: Admin đòi vào xem tủ sách của Reader)
    if (to.meta.role && to.meta.role !== userRole) {
      // Đẩy về trang chủ
      return next({ name: 'home' })
    }
  }

  // 3. Nếu route CHỈ DÀNH CHO KHÁCH (requiresGuest - trang Login)
  if (to.meta.requiresGuest && token && user) {
    // Đã đăng nhập mà cố tình vào /login -> Đẩy về trang chủ
    return next({ name: 'home' })
  }

  // 4. Hợp lệ tất cả điều kiện -> Cho qua
  next()
})

export default router
