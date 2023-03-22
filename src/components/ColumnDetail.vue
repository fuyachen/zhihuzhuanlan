<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
          :alt="column.title"
          class="rounded-circle border"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :postList="postList"></PostList>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { computed } from "vue"
import { GlobalDataProps } from "@/store"
import { useStore } from "vuex"

const route = useRoute()
const store = useStore<GlobalDataProps>()

const currentId = +route.params.id

// 获取id对应的专栏
// const column = testData.find((column) => column.id === currentId)
const column = computed(() => store.getters.getColumnById(currentId))

// 获取专栏中的文章
const postList = computed(() => store.getters.getPostById(currentId))
</script>

<style scoped></style>
