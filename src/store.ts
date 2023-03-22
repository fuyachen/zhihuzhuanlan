import { createStore } from "vuex"
import { ColumnProps, PostProps, testData, testPosts } from "@/testData"
import { UserProps } from "@/components/GlobalHeader.vue"

//为了获取store的代码提示，我们需要定义store中state的类型,再传入泛型中
export interface GlobalDataProps {
  user: UserProps
  columns: ColumnProps[]
  posts: PostProps[]
}

const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false,
    },
    columns: testData,
    posts: testPosts,
  },
})

export default store
