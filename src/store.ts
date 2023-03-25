import { createStore, Commit } from "vuex"
import axios from "axios"

export interface UserProps {
  _id?: string
  email?: string
  nickName?: string
  column?: string
  isLogin: boolean
}

// _id	string
// email	string
// nickName	string
// description	string
// avatar	string
// column	string
// createdAt	string($date-time)

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
  loading: boolean
  token: string
}

// 封装get请求
const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  // 将data从响应体中解构出来
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

//封装post请求
const postAndCommit = async (
  url: string,
  payload: any,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    user: { isLogin: false },
    columns: [],
    posts: [],
    loading: false,
    token: localStorage.getItem("token") || "",
  },

  mutations: {
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
    },
    setLoading(state, status) {
      state.loading = status
    },
    // 获取token,并将其添加到请求头中
    login(state, payload) {
      const { token } = payload.data
      state.token = token
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    },
    // 更新用户信息
    fetchCurrentUser(state, rawData) {
      state.user = { ...rawData.data, isLogin: true }
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

    fetchCurrentUser({ commit }) {
      getAndCommit("/user/current", "fetchCurrentUser", commit)
    },

    login({ commit }, payload) {
      // !!!这里要返回promise，否则mutation中拿不到数据！！！
      return postAndCommit("/user/login", payload, "login", commit)
    },

    // 组合action，触发登录和获取用户信息
    loginAndFetch({ dispatch }, payload) {
      // 返回promise
      return dispatch("login", payload).then(() => dispatch("fetchCurrentUser"))
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
