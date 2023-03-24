<template>
  <Teleport to="#loading">
    <div
      class="loading-container d-flex flex-column justify-content-center align-items-center h-100 w-100"
    >
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-primary">拼命加载中</p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onUnmounted } from "vue"

const node = document.createElement("div")
node.id = "loading"
document.body.appendChild(node)

onUnmounted(() => {
  document.body.removeChild(node)
})
</script>

<style scoped>
.loading-container {
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 100;
}
p {
  display: block;
}
</style>
