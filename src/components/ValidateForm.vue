<template>
  <form class="validate-form-container">
    <slot></slot>
    <!-- submit元素的默认行为会刷新页面，需要prevent组织默认行为 -->
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">Submit</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ValidteFunc, mittEvent, funcArr } from "../ts/mitt"

// 每加载一项表单，就向数组中添加表单的验证函数

const callback = (func: ValidteFunc) => {
  funcArr.push(func)
}

mittEvent(callback)

const emit = defineEmits(["from-submit"])

const submitForm = () => {
  // map的返回值[boolean, boolean,...];使用every遍历
  const result = funcArr.map((func) => func()).every((ele) => ele)
  // 自定义事件form-submit触发的回调函数会接收result作为其参数
  emit("from-submit", result)
}
</script>

<style scoped></style>
