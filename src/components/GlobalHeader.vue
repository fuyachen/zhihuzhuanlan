<template>
  <nav
    class="navbar bg-primary sticky-top justify-content-between mb-4 px-4"
    data-bs-theme="dark"
  >
    <routerLink
      to="/"
      class="navbar-brand ms-3"
      style="color: aliceblue"
      href="#"
    >
      <img
        src="@/assets/image/logo.png"
        alt="Logo"
        width="40"
        height="40"
        class="d-inline-block align-text-center"
      />
      知乎专栏
    </routerLink>
    <ul v-if="!currentUser.isLogin" class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <router-Link to="/login" href="#" class="btn btn-outline-light"
          >登录</router-Link
        >
      </li>
      <li class="list-inline-item">
        <routerLink to="/signup" class="btn btn-outline-light">注册</routerLink>
      </li>
    </ul>
    <ul v-else class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <!-- 使用模板字符串可以避免username是undefined的错误 -->
        <Dropdown :title="`欢迎你，${currentUser.nickName}`">
          <dropdown-item
            ><routerLink to="/createPost" class="dropdown-item"
              >新建文章</routerLink
            ></dropdown-item
          >
          <dropdown-item closeAfterClick
            ><router-link
              :to="`/column/${currentUser.column}`"
              class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item closeAfterClick
            ><routerLink to="/edit" class="dropdown-item"
              >编辑资料</routerLink
            ></dropdown-item
          >
          <dropdown-item @click="signout"
            ><a class="dropdown-item" href="#">退出登录</a></dropdown-item
          >
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import Dropdown from "./Dropdown.vue"
import DropdownItem from "./DropdownItem.vue"
import { useStore } from "vuex"
import { GlobalDataProps } from "@/store"
import { computed } from "vue"
import { useRouter } from "vue-router"
import createMessge from "@/ts/createMessage"

const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
const router = useRouter()
const signout = () => {
  localStorage.removeItem("token")
  createMessge("您已退出登录，即将返回首页", "default", 2000)
  store.dispatch("fetchCurrentUser").then(() => {
    setTimeout(() => {
      store.commit("logout")
      router.push("/")
    }, 2000)
  })
}
</script>

<style scoped></style>
