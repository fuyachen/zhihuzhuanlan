<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="postList"></PostList>
  </div>
</template>

<script setup lang="ts">
import PostList from "./PostList.vue"
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"
import { ColumnProps, GlobalDataProps } from "@/store"
import { useStore } from "vuex"
import { addColumnAvatar } from "@/ts/generateFitUrl"

const route = useRoute()
const store = useStore<GlobalDataProps>()

const currentId = route.params.id

onMounted(() => {
  store.dispatch("fetchColumn", currentId)
  store.dispatch("fetchPosts", currentId)
})
// 获取id对应的专栏
const column = computed(() => {
  let selectColumn = store.getters.getColumnById(currentId) as
    | ColumnProps
    | undefined
  // if (!column.avatar.url) {
  //   column.avatar.url = imgUrl
  // }
  if (selectColumn) {
    addColumnAvatar(selectColumn, 100, 100)
  }
  return selectColumn
})
// 获取专栏中的文章
const postList = computed(() => store.getters.getPostsByCid(currentId))
</script>

<style scoped></style>
