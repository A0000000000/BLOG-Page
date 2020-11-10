import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/systemConfig',
    name: 'SystemConfig',
    component: () => import('../views/SystemConfig.vue'),
    children: [
      {
        path: 'codeContrast',
        name: 'CodeContrast',
        component: () => import('../components/system_config/CodeContrast.vue')
      },
      {
        path: 'accessSource',
        name: 'AccessSource',
        component: () => import('../components/system_config/AccessSource.vue')
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('../components/system_config/Config.vue')
      }
    ]
  },
  {
    path: '/websiteInfo',
    name: 'WebsiteInfo',
    component: () => import('../views/WebsiteInfo.vue'),
    children: [
      {
        path: 'log',
        name: 'Log',
        component: () => import('../components/websit_info/Log.vue')
      },
      {
        path: 'accessInfo',
        name: 'AccessInfo',
        component: () => import('../components/websit_info/AccessInfo.vue')
      }
    ]
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('../views/UserInfo.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
