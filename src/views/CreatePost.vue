<template>
  <div class="create-post-page">
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
import { GlobalDataProps } from "@/store"
import { PostProps } from "@/testData"
import { useRouter } from "vue-router"

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
    const { columnId } = store.state.user
    if (columnId) {
      const newPost: PostProps = {
        columnId,
        id: new Date().getTime(),
        title: titleVal.value,
        createdAt: new Date().toLocaleString(),
        content: contentVal.value,
      }
      store.commit("createPost", newPost)
      // 创建完成后，跳转到专栏详情页
      router.push({ name: "column", params: { id: columnId } })
    }
  }
}
</script>

<style scoped></style>
