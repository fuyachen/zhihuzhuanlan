<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 mb-4 text-center shadow border-light">
        <div class="card-body">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
            class="my-4 border border-light rounded-circle"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="description card-text text-start my-4">
            {{ column.description }}
          </p>
          <routerLink
            :to="{ name: 'column', params: { id: column._id } }"
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
import { ColumnProps } from "@/store"
import { addColumnAvatar } from "@/ts/generateFitUrl"

// 父组件传来的专栏列表，是一个类型为ColumnProps的数组
const props = defineProps<{
  list: ColumnProps[]
}>()

// 当用户没有上传头像时，显示默认的图片
const columnList = computed(() => {
  return props.list.map((column) => {
    addColumnAvatar(column, 50, 50)
    return column
  })
})
</script>

<style scoped>
img {
  width: 50px;
}
.description {
  line-height: 20px;
  height: 43px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
