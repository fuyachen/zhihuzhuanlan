<template>
  <ValidateForm @from-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="test"
        placeholder="请输入邮箱"
      ></validate-input>
    </div>
    <div>
      <label class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="password"
        placeholder="请输入6-16位密码"
        type="password"
      ></validate-input>
    </div>
    <template v-slot:submit>
      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
    </template>
  </ValidateForm>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue"
import ValidateForm from "../components/ValidateForm.vue"

// 表单规则
const onFormSubmit = (result: boolean) => {
  console.log(result)
}

const test = ref("")
const emailRules: RulesProp = [
  { type: "required", message: "请输入邮箱" },
  { type: "email", message: "请输入正确的邮箱地址" },
]

const password = ref("")
const passwordRules: RulesProp = [
  { type: "required", message: "密码不能为空" },
  { type: "min", message: "密码至少包含6位，且不能出现空格" },
  { type: "max", message: "密码不能超过16位" },
]
</script>

<style scoped></style>
