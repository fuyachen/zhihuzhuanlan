<template>
  <div class="post-detail-page">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <div class="image-container my-4">
        <img
          :src="currentImageUrl"
          alt="currentPost.title"
          v-if="currentImageUrl"
        />
      </div>
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-outline-primary"
          :to="{ name: 'createPost', query: { id: currentPost._id } }"
        >
          编辑
        </router-link>
        <button
          type="button"
          class="btn btn-outline-danger mx-3"
          @click.prevent="modalIsVisible = true"
        >
          删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import {
  GlobalDataProps,
  PostProps,
  ImageProps,
  UserProps,
  ResponseType,
} from "../store"
import UserProfile from "../components/UserProfile.vue"
import Modal from "../components/Modal.vue"
import createMessage from "../ts/createMessage"
import MarkdownIt from "markdown-it"

export default defineComponent({
  name: "post-detail",
  components: {
    UserProfile,
    Modal,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()
    onMounted(() => {
      store.dispatch("fetchPost", currentId)
    })
    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(currentId)
    )
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        const { isHTML, content } = currentPost.value
        return isHTML ? content : md.render(content)
      } else {
        return ""
      }
    })
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + "?x-oss-process=image/resize,w_850"
      } else {
        return ""
      }
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      console.log(currentId)
      store
        .dispatch("deletePost", currentId)
        .then((rawData: ResponseType<PostProps>) => {
          createMessage("删除成功，2秒后跳转到专栏首页", "success", 2000)
          setTimeout(() => {
            router.push({ name: "column", params: { id: rawData.data.column } })
          }, 2000)
        })
    }
    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEditArea,
      modalIsVisible,
      hideAndDelete,
    }
  },
})
</script>

<style>
.post-detail-page .image-container {
  height: 300px;
  overflow: hidden;
}
.post-detail-page .image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
