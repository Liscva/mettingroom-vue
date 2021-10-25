import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component:()=>import("../page/Home.vue")
  },
  {
    path: '/login',
    name: 'LoginPage',
    component:()=>import("../page/LoginPage.vue")
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component:()=>import("../page/admin/Index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
