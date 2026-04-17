import { createRouter, createWebHistory } from 'vue-router'
// import { P } from 'vue-router/dist/index-BzEKChPW.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BookListView.vue'),
    },
    {
      path: '/books/manage',
      name: 'manage-books',
      component: () => import('../views/AdminBookView.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/BorrowingHistoryView.vue'),
      meta: { requiresAuth: true, role: 'READER' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/publishers',
      name: 'publishers',
      component: () => import('../views/AdminPublisherView.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/borrowings/manage',
      name: 'manage-borrowings',
      component: () => import('../views/BorrowManagerView.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/AdminCategoryView.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/policies',
      name: 'policies',
      component: () => import('../views/LibraryPolicies.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import("../views/ForgotPasswordView.vue"),
      meta: {requiresGuest: true, },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import("../views/AdminDashboard.vue"),
      meta: {requiresAuth: true, role: 'ADMIN'}
    }
  ],
})

/**
 * ================================
 * NAVIGATION GUARD (BẢO MẬT)
 * ================================
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const userRole = user?.role

  // 1. Route cần đăng nhập
  if (to.meta.requiresAuth) {
    if (!token || !user) {
      return next({ name: 'login' })
    }

    // Kiểm tra role (nếu có)
    if (to.meta.role && to.meta.role !== userRole) {
      return next({ name: 'home' })
    }
  }

  // 2. Route chỉ dành cho khách (login, register)
  if (to.meta.requiresGuest) {
    if (token && user) {
      return next({ name: 'home' })
    }
  }

  // 3. Hợp lệ → cho qua
  return next()
})

export default router
