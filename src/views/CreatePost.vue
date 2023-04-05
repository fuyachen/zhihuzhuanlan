<template>
  <div class="create-post-page">
    <Uploader
      :beforeUpload="uploadCheck"
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      @file-uploaded="handleFileUploaded"
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
    <div class="form-text py-2 text-center">
      Allowed *.jpg, *.png, *.gif<br />
      max size of 1 MB
    </div>
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
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">发表文章</button>
        </div>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ValidateForm from "@/components/ValidateForm.vue"
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue"
import { useStore } from "vuex"
import { GlobalDataProps, PostProps, ResponseType } from "@/store"
import { useRouter } from "vue-router"
import createMessge from "@/ts/createMessage"
import Uploader from "@/components/Uploader.vue"
import { beforeUploadCheck } from "@/ts/uploadCheck"

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
  if (result) {
    const { column, _id } = store.state.user
    if (column) {
      const newPost: PostProps = {
        column,
        title: titleVal.value,
        content: contentVal.value,
        author: _id,
      }
      if (imageId) {
        newPost.image = imageId
      }
      console.log(column)
      store.dispatch("createPost", newPost).then(() => {
        createMessge("发表成功，即将跳转到文章", "success", 2000)
      })
      // 创建完成后，跳转到专栏详情页
      setTimeout(() => {
        router.push({ name: "column", params: { id: column } })
      }, 2000)
    }
  }
}

// 检查上传文件格式，大小
const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ["image/jpeg", "image/png", "image/gif"],
    size: 2,
  })
  const { passed, error } = result
  if (error === "format") {
    createMessge("上传的图片只能是JPG、PNG、GIF格式!", "error", 2000)
  }
  if (error === "size") {
    createMessge("图片大小不能超过2MB!", "error", 1000)
  }
  return passed
}

// 上传文件后，获取后端返回的图片id
let imageId = ""
const handleFileUploaded = (rawData: ResponseType) => {
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
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
