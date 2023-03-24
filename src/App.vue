<template>
  <div class="container-fluid px-0">
    <global-header></global-header>
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
import { computed } from "vue"

const store = useStore()
const isLoading = computed(() => store.state.loading)
</script>

<style scoped></style>
