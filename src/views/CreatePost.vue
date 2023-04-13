<template>
  <div class="create-post-page mx-5">
    <Uploader
      :uploaded="uploadedData"
      :beforeUpload="uploadCheck"
      action="upload"
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
        <div class="uploaded-area">
          <img :src="slotProps.uploadedData.data.url" />
          <h3>点击重新上传</h3>
        </div>
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
          <button type="submit" class="btn btn-primary btn-lg">
            {{ isEditMode ? "更新文章" : "发表文章" }}
          </button>
        </div>
      </template>
    </ValidateForm>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import ValidateForm from "@/components/ValidateForm.vue"
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue"
import { useStore } from "vuex"
import { GlobalDataProps, ImageProps, PostProps, ResponseType } from "@/store"
import { useRouter, useRoute } from "vue-router"
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
const route = useRoute()

// 提交表单
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
      const actionName = isEditMode ? "updatePost" : "createPost"
      const sendData = isEditMode
        ? { id: route.query.id, payload: newPost }
        : newPost
      store.dispatch(actionName, sendData).then(() => {
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
const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}

// 点击编辑文章后，获取文章id，请求文章数据
const isEditMode = !!route.query.id
const uploadedData = ref()

onMounted(() => {
  if (isEditMode) {
    store
      .dispatch("fetchPost", route.query.id)
      .then((rawData: ResponseType<PostProps>) => {
        const currentPost = rawData.data
        if (currentPost.image) {
          uploadedData.value = { data: currentPost.image }
        }
        titleVal.value = currentPost.title
        contentVal.value = currentPost.content
      })
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 300px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
