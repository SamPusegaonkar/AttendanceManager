import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import ProfessorPortal from "..//components//ProfessorPortal.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/professorportal", name: "professorportal", component: ProfessorPortal }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
