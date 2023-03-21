<template>
  <div class="container-fluid px-0">
    <global-header :user="testUser"></global-header>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue"

// 用户数据
const testUser: UserProps = {
  id: 1,
  username: "Viking",
  isLogin: true,
}
</script>

<style scoped></style>
