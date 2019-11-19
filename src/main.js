import Vue from 'vue'
import App from './App.vue'

import router from 'vue-router'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

export default router;


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
