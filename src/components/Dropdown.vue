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

<script lang="ts">
import mitt from "mitt"
export const emitter = mitt()
</script>

<script setup lang="ts">
import { ref, watch } from "vue"
import useClickOutside from "@/hooks/useClickOutside"

defineProps<{ title: string }>()

// 类型断言，不用定义类型
let isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

// 显式指定的泛型参数和一个初始值null
const dropdown = ref(<HTMLElement | null>null)

const isClickOutside = useClickOutside(dropdown)

// isClickOutside的类型为Ref<boolean>，侦听它的变化
watch(isClickOutside, () => {
  if (isClickOutside.value && isOpen.value) {
    isOpen.value = false
  }
})

const dropDownItemClicked = () => {
  isOpen.value = false
}
emitter.on("dropdown-item-clicked", dropDownItemClicked)
</script>

<style scoped></style>
