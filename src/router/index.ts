import { createRouter, createWebHistory } from "vue-router";
import recruiter from "@/pages/recruiter.vue";
import talent from "@/pages/talent.vue";
import index from "@/pages/index.vue";

const routes = [
  {
    path: "/recruiter",
    name: "Recruiter",
    component: recruiter,
  },
  {
    path: "/",
    name: "Home",
    component: index,
  },
  {
    path: "/talent",
    name: "Talent",
    component: talent,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
