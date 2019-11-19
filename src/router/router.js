// 导入vue
import Vue from 'vue'

// 导入vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 1 导入组件login.vue
import login from '../views/login/login.vue'

// 2 定义规则
const routes = [
  // login
  {
    path: '/login',
    component: login
  }
];

// 3 创建路由实例
const router = new VueRouter({
  routes
});

// 挂载到Vue实例 
// 暴露出去 类似module.exports = router
export default router;