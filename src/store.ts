import { createStore } from "vuex"
import { PostProps, testPosts } from "@/testData"
import axios from "axios"

export interface UserProps {
  id?: number
  columnId?: number
  username?: string
  isLogin: boolean
}

interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
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
    columns: [],
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
    fetchColumns(state, rawData) {
      //   debugger
      state.columns = rawData.data.list
    },
  },
  actions: {
    fetchColumns({ commit }) {
      axios
        .get("/columns", { params: { currentPage: 1, pageSize: 5 } })
        .then((res) => commit("fetchColumns", res.data))
    },
  },
  getters: {
    biggerColumn(state) {
      return (num: number) =>
        state.columns.filter((column) => +column._id > num)
    },

    getColumnById(state) {
      return (id: number) => state.columns.find((column) => +column._id === id)
    },

    getPostById(state) {
      return (id: number) => state.posts.filter((post) => post.columnId === id)
    },
  },
})

export default store
