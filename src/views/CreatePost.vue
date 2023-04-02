<template>
  <div class="create-post-page">
    <Uploader
      :beforeUpload="beforeUpload"
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传文章头图</h2>
      <template v-slot:uploading>
        <div class="d-flex">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">加载中...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template v-slot:uploaded="slotProps">
        <img :src="slotProps.uploadeData.data.url" />
      </template>
    </Uploader>
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
import createMessge from "@/ts/createMessage"
import Uploader from "@/components/Uploader.vue"

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

const beforeUpload = (file: File) => {
  const isPic =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/gif"
  if (!isPic) {
    createMessge("上传的图片只能是JPG、PNG、GIF格式", "error")
  }
  return isPic
}
</script>

<style>
.create-post-page .file-upload-container {
  height: 300px;
  cursor: pointer;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
