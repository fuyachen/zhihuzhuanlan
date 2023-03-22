<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area">
      <slot name="submit">
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="submitForm"
        >
          Submit
        </button>
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
  emit("from-submit", result)
}
</script>

<style scoped></style>
