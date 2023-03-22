import { createRouter, createWebHistory } from "vue-router"
import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import ColumnDetail from "./components/ColumnDetail.vue"
import CreatePost from "./views/CreatePost.vue"

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
  {
    name: "column",
    path: "/column/:id",
    component: ColumnDetail,
  },
  {
    name: "createPost",
    path: "/createPost",
    component: CreatePost,
  },
]

const routerHistory = createWebHistory()

const router = createRouter({ routes, history: routerHistory })

export default router
