<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 mb-4 text-center shadow border-light">
        <div class="card-body">
          <img
            :src="column.avatar.url"
            :alt="column.title"
            class="my-4 border border-light rounded-circle"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start my-4">{{ column.description }}</p>
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
import imgUrl from "@/assets/column.jpg"
import { ColumnProps } from "@/store"

// 父组件传来的专栏列表，是一个类型为ColumnProps的数组
const props = defineProps<{
  list: ColumnProps[]
}>()

// 当用户没有上传头像时，显示默认的图片
const columnList = computed(() => {
  return props.list.map((column) => {
    if (!column.avatar) {
      column.avatar.url = imgUrl
    } else {
      column.avatar.url =
        column.avatar.url + "?x-oss-process=image/resize,m_fixed,h_50,w_50"
    }
    return column
  })
})
</script>

<style scoped>
img {
  width: 50px;
}
</style>
