<template>
  <div class="create-post-page">
    <input type="file" name="file" @change.prevent="handleFileChange" />
    <ValidateForm @from-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
        ></validate-input>
      </div>
      <div>
        <label class="form-label">文章内容</label>
        <validate-input
          tag="textarea"
          :rules="contentRules"
          v-model="contentVal"
          placeholder="请输入文章详情"
          type="text"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary btn-lg">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ValidateForm from "@/components/ValidateForm.vue"
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue"
import { useStore } from "vuex"
import { GlobalDataProps, PostProps } from "@/store"
import { useRouter } from "vue-router"
import axios from "axios"

const titleVal = ref("")
const contentVal = ref("")

const titleRules: RulesProp = [
  { type: "required", message: "文章标题不能为空" },
]
const contentRules: RulesProp = [
  { type: "required", message: "文章内容不能为空" },
]

const store = useStore<GlobalDataProps>()
const router = useRouter()

const onFormSubmit = (result: boolean) => {
  console.log(result)
  if (result) {
    const { column } = store.state.user
    if (column) {
      const newPost: PostProps = {
        column,
        title: titleVal.value,
        createdAt: new Date().toLocaleString(),
        content: contentVal.value,
      }
      store.commit("createPost", newPost)
      // 创建完成后，跳转到专栏详情页
      router.push({ name: "column", params: { id: column } })
    }
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement //获取Input元素
  const files = target.files //files是input中的文件
  if (files) {
    const uploadedFile = files[0] //只上传一个文件
    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      })
      .then((res: object) => console.log(res))
  }
}
</script>

<style scoped></style>
