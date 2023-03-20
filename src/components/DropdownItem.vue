<template>
  <!-- disable存在则有is-disabled类 -->
  <li class="dropdown-item" :class="{ 'is-disabled': disabled }">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false,
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
