import { createStore } from "vuex"
import { ColumnProps, PostProps, testData, testPosts } from "@/testData"

export interface UserProps {
  id?: number
  columnId?: number
  username?: string
  isLogin: boolean
}

//为了获取state的代码提示，我们需要定义store中state的类型,再传入泛型中
export interface GlobalDataProps {
  user: UserProps
  columns: ColumnProps[]
  posts: PostProps[]
}

const store = createStore<GlobalDataProps>({
  state: {
    user: {
      columnId: 2,
      isLogin: false,
    },
    columns: testData,
    posts: testPosts,
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, username: "Viking", isLogin: true }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
      console.log(state.posts)
    },
  },
  getters: {
    biggerColumn(state) {
      return (num: number) => state.columns.filter((column) => column.id > num)
    },

    getColumnById(state) {
      return (id: number) => state.columns.find((column) => column.id === id)
    },

    getPostById(state) {
      return (id: number) => state.posts.filter((post) => post.columnId === id)
    },
  },
})

export default store
