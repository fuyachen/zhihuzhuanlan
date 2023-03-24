import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import ColumnDetail from "@/components/ColumnDetail.vue"
import CreatePost from "@/views/CreatePost.vue"
import store from "@/store"

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
    meta: { redirectAlreadyLogin: true },
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
    meta: { requiredLogin: true },
  },
]

const routerHistory = createWebHistory()

const router = createRouter({ routes, history: routerHistory })

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: "login" })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next("/")
  } else {
    next()
  }
})

export default router
