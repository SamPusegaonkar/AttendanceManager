import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Mainpage from './/components//Mainpage.vue';
import ProfessorPortal from './/components//ProfessorPortal.vue';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes=[
  {path:'/',component:Mainpage},
  {path:'/professorportal',component:ProfessorPortal},
];

const router =new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
