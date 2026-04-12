import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  }, 
  {
      path: '/admin',
      // Dùng Layout làm Component cha
      component: () => import('../layouts/AdminLayout.vue'), 
      children: [
        {
          // Khi vào /admin/dashboard -> Load AdminDashboardView vào trong Layout
          path: 'dashboard', 
          name: 'admin-dashboard',
          component: () => import('../views/AdminDashboardView.vue'),
        },
        // Sau này bạn làm trang Sách thì chỉ cần thêm vào đây
        // {
        //   path: 'books',
        //   name: 'admin-books',
        //   component: () => import('../views/AdminBooksView.vue'),
        // }
      ]
    },{
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  }],
})

export default router
