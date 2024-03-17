import { createWebHistory, createRouter } from "vue-router";

import LayoutAdmin from "@/components/layouts/LayoutAdmin.vue";

import AdminHome from "@/views/AdminHome.vue";
import MyTask from "@/views/MyTask.vue";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
const Layout = [
  {
    path: "/admin",
    component: LayoutAdmin,
    children: [
      {
        path: "",
        component: AdminHome,
      },
    ],
  },

  {
    path: "/mytask/:id",
    component: LayoutAdmin,
    children: [
      {
        path: "",
        component: MyTask,
      },
    ],
  },

  {
    path: "/register",
    name: "register",
    component:Register
  }
  ,
  {
    path: "/login",
    name: "login",
    component:Login
  }
];

const employeesLayout = [];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Layout,
});
export default router;
