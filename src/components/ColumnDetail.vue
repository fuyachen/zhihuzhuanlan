<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar.url"
          :alt="column.title"
          class="rounded-circle border"
          style="width: 150px"
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
import PostList from "./PostList.vue"
import { useRoute } from "vue-router"
import { computed, onMounted } from "vue"
import { GlobalDataProps, PostProps } from "@/store"
import { useStore } from "vuex"
import imgUrl from "@/assets/column.jpg"

const route = useRoute()
const store = useStore<GlobalDataProps>()

const currentId = route.params.id

onMounted(() => {
  store.dispatch("fetchColumn", { cid: currentId })
  store.dispatch("fetchPosts", { cid: currentId })
})
// 获取id对应的专栏
const column = computed(() => {
  let column = store.getters.getColumnById(currentId)
  if (!column.avatar.url) {
    column.avatar.url = imgUrl
  }
  return column
})
// 获取专栏中的文章
const postList = computed(() => {
  let postList: PostProps[] = store.getters.getPostById(currentId)
  console.log(postList)
  postList = postList.map((post) => {
    if (!post.image.url) {
      post.image.url = imgUrl
    } else {
      post.image.url =
        post.image.url + "?x-oss-process=image/resize,m_fixed,h_100,w_200"
    }
    return post
  })
  return postList
})
</script>

<style scoped></style>
