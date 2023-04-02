import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import ColumnDetail from "@/components/ColumnDetail.vue"
import CreatePost from "@/views/CreatePost.vue"
import store from "@/store"
import Signup from "./views/Signup.vue"
import axios from "axios"

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
  {
    name: "signup",
    path: "/signup",
    component: Signup,
  },
]

const routerHistory = createWebHistory()

const router = createRouter({ routes, history: routerHistory })

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      //未登录，有token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch("fetchCurrentUser") //token验证成功，获取用户信息
        .then(() => {
          if (redirectAlreadyLogin) {
            next("/") //如果是登陆页面，则跳转到首页
          } else {
            next() //路由放行
          }
        })
        .catch((err) => {
          console.log(err)
          store.commit("logout")
          next("login")
        })
    } else {
      if (requiredLogin) {
        //未登录，无token
        next("login")
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next("/") //已经登录，且需要跳转首页的
    } else {
      next() //已经登陆，路由放行
    }
  }
})

export default router
