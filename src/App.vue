<template>
  <div class="container-fluid px-0">
    <global-header></global-header>
    <main>
      <Loader v-if="isLoading"></Loader>
      <router-view></router-view>
    </main>
    <footer class="text-center py-4 text-secondary bg-light mt-4">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2023 知乎专栏 ·</li>
          <li class="list-inline-item">
            <a
              href="https://github.com/fuyachen"
              class="link-primary"
              style="text-decoration: none"
              >github ·</a
            >
          </li>
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
import { computed, watch } from "vue"
import { GlobalDataProps } from "./store"
import createMessge from "./ts/createMessage"

const store = useStore<GlobalDataProps>()
const isLoading = computed(() => store.state.loading)
const err = computed(() => store.state.error)

// 侦听err，status为true，渲染错误信息提示组件
watch(
  () => err.value.status,
  () => {
    const { message, status } = err.value
    if (status && message) {
      createMessge(message, "error")
    }
  }
)
</script>

<style></style>
