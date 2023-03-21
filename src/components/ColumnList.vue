<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 mb-4 text-center shadow border-light">
        <div class="card-body">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="w-25 my-4 border border-light rounded-circle"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start my-4">{{ column.description }}</p>
          <routerLink
            :to="{ name: 'column', params: { id: column.id } }"
            class="btn btn-primary"
            >进入专栏</routerLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import imgUrl from "@/assets/column.jpg"

// 定义单个专栏的数据结构
export interface ColumnProps {
  id: number //每个专栏的id
  avatar?: string //头像图片地址
  title: string //专栏标题
  description: string //简介
}

// 父组件传来的专栏列表，是一个类型为ColumnProps的数组
const props = defineProps<{
  list: ColumnProps[]
}>()

// 当用户没有上传头像时，显示默认的图片
const columnList = computed(() => {
  return props.list.map((column) => {
    if (!column.avatar) {
      column.avatar = imgUrl
    }
    return column
  })
})
</script>

<style scoped></style>
