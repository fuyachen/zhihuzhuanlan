<template>
  <div class="container-fluid px-0">
    <global-header :user="currentUser"></global-header>
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
import { useStore } from "vuex"
import { GlobalDataProps } from "@/store"
import { computed } from "vue"

const store = useStore<GlobalDataProps>()
const currentUser = computed(() => store.state.user)
</script>

<style scoped></style>
