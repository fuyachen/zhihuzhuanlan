<template>
  <li
    class="dropdown-option text-center"
    @click="handleItemClick"
    :class="{ 'is-disabled': disabled }"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { emitter } from "./Dropdown.vue"
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    closeAfterClick: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const handleItemClick = () => {
      emitter.emit("dropdown-item-clicked")
    }
    return {
      handleItemClick,
    }
  },
})
</script>

<style>
/* 不能使用scoped，因为作用域样式不会对<slot/>渲染出来的内容生效 */
.dropdown-item.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
