import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('../views/Home.vue') },
      { path: 'question-bank', name: 'PublicQuestionBank', component: () => import('../views/public/QuestionBank.vue') },
      { path: 'practice', name: 'PublicPractice', component: () => import('../views/public/Practice.vue') },
      { path: 'textbook', name: 'Textbook', component: () => import('../views/public/Textbook.vue') },
    ]
  },
  // 学生端路由
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
  // 教师端路由
  {
    path: '/teacher',
    component: () => import('../layouts/TeacherLayout.vue'),
    meta: { requiresAuth: true, role: 'teacher' },
    children: [
      { path: 'dashboard', name: 'TeacherDashboard', component: () => import('../views/teacher/Dashboard.vue') },
      { path: 'course/:id', name: 'TeacherCourseConsole', component: () => import('../views/teacher/CourseConsole.vue') },
    ]
  },
  // 管理员端路由
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    redirect: '/admin/dashboard', 
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: { title: '系统概览' } 
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('../views/admin/UserManagement.vue'),
        redirect: '/admin/users/stats',
        meta: { title: '用户管理' },
        children: [
          {
            path: 'stats',
            name: 'UserRealTimeStats',
            component: () => import('../views/admin/user/RealTimeStats.vue'),
            meta: { title: '实时用户统计' }
          },
          {
            path: 'online',
            name: 'UserOnline',
            component: () => import('../views/admin/user/OnlineStudents.vue'),
            meta: { title: '在线学生' }
          },
          {
            path: 'permissions',
            name: 'UserPermissions',
            component: () => import('../views/admin/user/DataPermissions.vue'),
            meta: { title: '用户数据权限' }
          },
          {
            path: 'logs',
            name: 'UserOperationLogs',
            component: () => import('../views/admin/user/OperationLogs.vue'),
            meta: { title: '操作权限日志' }
          }
        ]
      },
      {
        path: 'courses',
        name: 'CourseManagement',
        component: () => import('../views/admin/CourseManagement.vue'),
        redirect: '/admin/courses/audit',
        meta: { title: '课程管理' }, // 
        children: [
          {
            path: 'audit',
            name: 'CourseAudit',
            component: () => import('../views/admin/course/CourseAudit.vue'),
            meta: { title: '课程审核' }
          },
          {
            path: 'records',
            name: 'StudentRecords',
            component: () => import('../views/admin/course/StudentRecords.vue'),
            meta: { title: '学生记录' }
          },
          {
            path: 'resources',
            name: 'TeachingResources',
            component: () => import('../views/admin/course/TeachingResourcesLayout.vue'),
            redirect: '/admin/courses/resources/audit',
            meta: { title: '教学资源管理' },
            children: [
              {
                path: 'audit',
                name: 'ResourceAudit',
                component: () => import('../views/admin/course/resources/ResourceAudit.vue'),
                meta: { title: '资源审核' }
              },
              {
                path: 'warning',
                name: 'AcademicWarning',
                component: () => import('../views/admin/course/resources/AcademicWarning.vue'),
                meta: { title: '学业预警' }
              }
            ]
          }
        ]
      },
      {
        path: 'tasks-exams',
        name: 'TaskExamManagement',
        component: () => import('../views/admin/TaskExamManagement.vue'),
        meta: { title: '任务与考试管理' },
        redirect: '/admin/tasks-exams/manage', 
        children: [
          {
            path: 'manage',
            name: 'TaskManageList',
            component: () => import('../views/admin/tasks-exams/TaskManageList.vue'),
            meta: { title: '管理学习任务与考试' }
          },
          {
            path: 'audit',
            name: 'TaskAuditList',
            component: () => import('../views/admin/tasks-exams/TaskAuditList.vue'),
            meta: { title: '审核学习任务与考试' }
          }
        ]
      },
      {
        path: 'question-bank',
        name: 'QuestionBank',
        component: () => import('../views/admin/QuestionBank.vue'),
        redirect: '/admin/question-bank/manage',
        meta: { title: '题库与试卷管理' },
        children: [
          {
            path: 'manage',
            name: 'QuestionBankManageList',
            component: () => import('../views/admin/question-bank/QuestionBankManageList.vue'),
            meta: { title: '管理题库与试卷' }
          },
          {
            path: 'audit',
            name: 'QuestionBankAuditList',
            component: () => import('../views/admin/question-bank/QuestionBankAuditList.vue'),
            meta: { title: '审核题库与试卷' }
          }
        ]
      },
      {
        path: 'practice-data',
        name: 'PracticeData',
        component: () => import('../views/admin/PracticeData.vue'),
        meta: { title: '刷题数据监控' }
      },
      {
        path: 'system-config',
        name: 'SystemConfig',
        component: () => import('../views/admin/SystemConfig.vue'),
        meta: { title: '系统配置管理' }
      },
      {
        path: 'data-backup',
        name: 'DataBackup',
        component: () => import('../views/admin/DataBackup.vue'),
        meta: { title: '数据备份与恢复' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.meta.role && userStore.role !== to.meta.role) {
    // 权限不足时的处理：如果当前是管理员但想去学生页，跳回自己的首页
    if (userStore.role === 'admin') next('/admin/dashboard')
    else if (userStore.role === 'teacher') next('/teacher/dashboard')
    else if (userStore.role === 'student') next('/student/dashboard')
    else next('/')
  } else {
    next()
  }
})

export default router