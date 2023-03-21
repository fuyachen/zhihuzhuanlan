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
        src="@/assets/logo.png"
        alt="Logo"
        width="40"
        height="40"
        class="d-inline-block align-text-center"
      />
      知乎专栏
    </routerLink>
    <ul v-if="!user.isLogin" class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <router-Link to="/login" href="#" class="btn btn-outline-light"
          >登录</router-Link
        >
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <!-- 使用模板字符串可以避免username是undefined的错误 -->
        <Dropdown :title="`欢迎你，${user.username}`">
          <dropdown-item
            ><a class="dropdown-item" href="#">新建文章</a></dropdown-item
          >
          <dropdown-item disabled
            ><a class="dropdown-item" href="#">管理账户</a></dropdown-item
          >
          <dropdown-item
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

export interface UserProps {
  id?: number
  username?: string
  isLogin: boolean
}

defineProps<{ user: UserProps }>()
</script>

<style scoped></style>
