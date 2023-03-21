import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import Login from "./views/Login.vue"

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
]

const routerHistory = createWebHistory()

const router = createRouter({ routes, history: routerHistory })

export default router
