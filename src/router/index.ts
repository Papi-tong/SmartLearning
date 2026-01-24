import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('../views/Home.vue') },
      { path: 'login', name: 'Login', component: () => import('../views/Login.vue') },
      // Other public pages
      { path: 'question-bank', name: 'PublicQuestionBank', component: () => import('../views/public/QuestionBank.vue') },
      { path: 'practice', name: 'PublicPractice', component: () => import('../views/public/Practice.vue') },
      { path: 'textbook', name: 'Textbook', component: () => import('../views/public/Textbook.vue') },
    ]
  },
  {
    path: '/student',
    component: () => import('../layouts/StudentLayout.vue'),
    meta: { requiresAuth: true, role: 'student' },
    children: [
      { path: 'dashboard', name: 'StudentDashboard', component: () => import('../views/student/Dashboard.vue') },
      { path: 'course/:id', name: 'StudentCourseDetail', component: () => import('../views/student/CourseDetail.vue') },
      { path: 'tasks', name: 'StudentTasks', component: () => import('../views/student/Tasks.vue') },
    ]
  },
  {
    path: '/teacher',
    component: () => import('../layouts/TeacherLayout.vue'),
    meta: { requiresAuth: true, role: 'teacher' },
    children: [
      { path: 'dashboard', name: 'TeacherDashboard', component: () => import('../views/teacher/Dashboard.vue') },
      { path: 'course/:id', name: 'TeacherCourseConsole', component: () => import('../views/teacher/CourseConsole.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('../views/admin/Dashboard.vue') },
      { path: 'users', name: 'UserManagement', component: () => import('../views/admin/UserManagement.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.meta.role && userStore.role !== to.meta.role) {
    // Redirect based on role if trying to access unauthorized area
    // For simplicity, just redirect to home or their dashboard
    next('/') 
  } else {
    next()
  }
})

export default router
