import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
// import ScanQR from "..//components//ScanQR";
import ProfessorPortal from "..//components//ProfessorPortal.vue";
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/professorportal", name: "professorportal", component: ProfessorPortal },
  // { path: "/", name: "scanqr", component: ScanQR },
  // { path: "/", name: "professorportal", component: ProfessorPortal },
  // // { path: "/professorportal", component: ProfessorPortal },
  // { path: "/scanqr", component: ScanQR },
  // { path: "/adminportal", component: AdminPortal }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
