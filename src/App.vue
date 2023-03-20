<template>
  <div class="container-fluid px-0">
    <global-header :user="testUser"></global-header>
    <column-list :list="testData"></column-list>
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
  </div>
</template>

<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import { ref } from "vue"
import ColumnList, { ColumnProps } from "./components/ColumnList.vue"
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue"
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue"
import ValidateForm from "./components/ValidateForm.vue"

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

// 用户数据
const testUser: UserProps = {
  id: 1,
  username: "Viking",
  isLogin: true,
}

// 专栏数据
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是的test1专栏，有一段非常有意思的简介，可以更新一下欧",
  },

  {
    id: 2,
    title: "test2的专栏",
    description: "这是的test2专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },

  {
    id: 3,
    title: "test3的专栏",
    description: "这是的test3专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },

  {
    id: 4,
    title: "test4的专栏",
    description: "这是的test4专栏,有一段非常有意思的简介,可以更新一下欧",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100",
  },
]
</script>

<style scoped></style>
