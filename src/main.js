import Vue from 'vue'
import App from './App.vue'

// 导入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 导入抽取的路由
import router from './router/router.js'

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router // 挂载到Vue实例
}).$mount('#app')
