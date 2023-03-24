import { createStore, Commit } from "vuex"
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
export interface PostProps {
  _Id: string
  title: string
  image?: ImageProps
  content: string
  excerpt: string //content的摘要
  column: string
  createdAt: string
}

//为了获取state的代码提示，我们需要定义store中state的类型,再传入泛型中
export interface GlobalDataProps {
  user: UserProps
  columns: ColumnProps[]
  posts: PostProps[]
}

const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    user: {
      columnId: 2,
      isLogin: false,
    },
    columns: [],
    posts: [],
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, username: "Viking", isLogin: true }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
      console.log(state.posts)
    },
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit("/columns", "fetchColumns", commit)
    },

    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, "fetchColumn", commit)
    },

    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit)
    },
  },
  getters: {
    getColumnById(state) {
      return (cid: string) => state.columns.find((column) => column._id === cid)
    },

    getPostById(state) {
      return (cid: string) => {
        return state.posts.filter((post) => post.column === cid)
      }
    },
  },
})

export default store
