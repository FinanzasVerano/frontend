import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../auth/services/auth.service'

import LoginPage from '../auth/pages/login-page.component.vue'
import RegisterPage from '../auth/pages/register-page.component.vue'
import DashboardPage from '../administration/pages/dashboard-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
    { path: '/register', name: 'register', component: RegisterPage, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const isPublic = to.meta.public === true
  const requiresAuth = to.meta.requiresAuth === true
  const current = authService.getCurrent()

  if (!isPublic && requiresAuth && !current) {
    return { name: 'login' }
  }
})

export default router
