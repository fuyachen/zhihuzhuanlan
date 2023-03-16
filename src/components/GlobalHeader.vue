<template>
  <nav
    class="navbar bg-primary sticky-top justify-content-between mb-4 px-4"
    data-bs-theme="dark"
  >
    <a class="navbar-brand ms-3" style="color: aliceblue" href="#">
      <img
        src="@/assets/logo.png"
        alt="Logo"
        width="40"
        height="40"
        class="d-inline-block align-text-center"
      />
      知乎专栏
    </a>
    <ul v-if="!user.isLogin" class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light">登录</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline my-1 me-3">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light"
          >欢迎你，{{ user.username }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
export interface UserProps {
  id?: number
  username?: string
  isLogin: boolean
}

defineProps<{ user: UserProps }>()
</script>

<style scoped></style>
