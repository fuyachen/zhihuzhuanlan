<template>
  <ValidateForm @from-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱地址"
      ></validate-input>
    </div>
    <div>
      <label class="form-label">昵称</label>
      <validate-input
        :rules="nicknameRules"
        v-model="nicknameVal"
        placeholder="请输入昵称"
        type="text"
      ></validate-input>
    </div>
    <div>
      <label class="form-label">密码</label>
      <validate-input
        :rules="passwordRules"
        v-model="passwordVal"
        placeholder="请输入6-16位密码"
        type="password"
      ></validate-input>
    </div>
    <div>
      <label class="form-label">重复密码</label>
      <validate-input
        :rules="repeatPasswordRules"
        v-model="repeatPasswordVal"
        placeholder="请重复密码"
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
import { useRouter } from "vue-router"
import createMessge from "@/ts/createMessage"
import axios from "axios"

const router = useRouter()

const onFormSubmit = (result: boolean) => {
  if (result) {
    axios
      .post("/users", {
        email: emailVal.value,
        nickName: nicknameVal.value,
        password: passwordVal.value,
      })
      .then(() => {
        createMessge("注册成功 🎉 即将返回登陆页面", "success", 2000)
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const emailVal = ref("")
const emailRules: RulesProp = [
  { type: "required", message: "请输入邮箱" },
  { type: "email", message: "请输入正确的邮箱地址" },
]

const nicknameVal = ref("")
const nicknameRules: RulesProp = [{ type: "required", message: "昵称不能为空" }]

const passwordVal = ref("")
const passwordRules: RulesProp = [
  { type: "required", message: "密码不能为空" },
  { type: "min", message: "密码至少包含6位，且不能出现空格" },
  { type: "max", message: "密码不能超过16位" },
]

const repeatPasswordVal = ref("")
const repeatPasswordRules: RulesProp = [
  { type: "required", message: "请重复密码" },
  {
    type: "custom",
    message: "两次输入的密码不一致",
    customValidator: () => passwordVal.value === repeatPasswordVal.value,
  },
]
</script>

<style scoped></style>
