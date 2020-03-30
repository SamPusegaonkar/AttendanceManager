import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Mainpage from './/components//Mainpage.vue';
// import ProfessorPortal from './/components//ProfessorPortal.vue';
// import AdminPortal from './/components//AdminPortal.vue';
// import ScanQR from './/components//ScanQR.vue';
import vuetify from './plugins/vuetify';
Vue.use(VueRouter);
Vue.config.productionTip = false

const routes=[
  {path:'/',component:Mainpage},
  // {path:'/professorportal',component:ProfessorPortal},

  // {path:'/scanqr',component:ScanQR},
  // {path:'/adminportal',component:AdminPortal}

];

const router =new VueRouter({
  routes
});



new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
