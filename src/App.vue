<template>
  <div class="container-fluid px-0">
    <global-header></global-header>
    <Message :message="err.message" alert-type="error"></Message>
    <Loader v-if="isLoading"></Loader>
    <router-link to="/"></router-link>
    <router-link to="/login"></router-link>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-4">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2023 知乎专栏 ·</li>
          <li class="list-inline-item">github ·</li>
          <li class="list-inline-item">联系我们</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalHeader from "./components/GlobalHeader.vue"
import Loader from "./components/Loader.vue"
import { useStore } from "vuex"
import { computed, onMounted } from "vue"
import { GlobalDataProps } from "./store"
import axios from "axios"
import Message from "./components/Message.vue"

const store = useStore<GlobalDataProps>()
const isLoading = computed(() => store.state.loading)
const err = computed(() => store.state.error)

// App第一次加载时检查token是否存在，以及用户是否未登录
onMounted(() => {
  if (store.state.token && !store.state.user.isLogin) {
    axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`
    store.dispatch("fetchCurrentUser")
  }
})
</script>

<style scoped></style>
