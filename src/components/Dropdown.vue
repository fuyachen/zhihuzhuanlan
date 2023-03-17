<template>
  <div class="dropdown" ref="dropdown">
    <a
      href="#"
      class="btn btn-outline-light dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <ul class="dropdown-menu mt-2" style="display: block" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

defineProps<{ title: string }>()

// 类型断言，不用定义类型
let isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

// 显式指定的泛型参数和一个初始值null
const dropdown = ref(<HTMLElement | null>null)

// 事件处理函数:如果点击区域在dropdown元素外，且isOpen为true，收起菜单
const handler = (e: MouseEvent) => {
  if (!dropdown.value?.contains(e.target as HTMLElement) && isOpen.value) {
    isOpen.value = false
  } else {
    isOpen.value = true
  }
}

// 组件被挂载后，可以获取到DOM节点
onMounted(() => {
  document.addEventListener("click", handler)
})

// 卸载后，清除监听，防止内存泄漏
onUnmounted(() => {
  document.removeEventListener("click", handler)
})
</script>

<style scoped></style>
