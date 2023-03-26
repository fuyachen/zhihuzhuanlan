<template>
  <ValidateForm @from-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱"
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
import { GlobalDataProps } from "@/store"
import { useStore } from "vuex"
import createMessge from "@/ts/createMessage"

const store = useStore<GlobalDataProps>()

const router = useRouter()

const onFormSubmit = (result: boolean) => {
  if (result) {
    store
      .dispatch("loginAndFetch", {
        email: emailVal.value,
        password: passwordVal.value,
      })
      .then(() => {
        createMessge("登陆成功 🎉 2秒后跳转到首页", "success", 2000)
        setTimeout(() => {
          router.push("/")
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

const passwordVal = ref("")
const passwordRules: RulesProp = [
  { type: "required", message: "密码不能为空" },
  { type: "min", message: "密码至少包含6位，且不能出现空格" },
  { type: "max", message: "密码不能超过16位" },
]
</script>

<style scoped></style>
