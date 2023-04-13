<template>
  <div class="home-page container px-0">
    <div class="row py-lg-5 text-center">
      <div class="col-lg-6 col-md-8 mx-auto">
        <img src="../assets/callout.svg" alt="callout" class="w-50 mb-4" />
        <h2 class="font-weight-light">随心写作，自由表达</h2>
        <p>
          <routerLink to="./createPost" class="btn btn-primary my-4"
            >开始写文章</routerLink
          >
        </p>
      </div>
    </div>
    <column-list :list="columns"></column-list>
  </div>
</template>

<script setup lang="ts">
import ColumnList from "../components/ColumnList.vue"
import { useStore } from "vuex"
import { GlobalDataProps } from "@/store"
import { computed, onMounted } from "vue"

// 专栏数据
const store = useStore<GlobalDataProps>()

onMounted(() => {
  store.dispatch("fetchColumns")
})

const columns = computed(() => store.getters.getColumns)
</script>

<style scoped>
.home-page {
  background-image: url(@/assets/background.svg);
  background-attachment: fixed;
}
</style>
