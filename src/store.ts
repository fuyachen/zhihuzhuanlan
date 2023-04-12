import { createStore, Commit } from "vuex"
import axios, { AxiosRequestConfig } from "axios"

export interface UserProps {
  _id?: string
  email?: string
  nickName?: string
  column?: string
  isLogin: boolean
  avatar?: ImageProps
  description?: string
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
export interface PostProps {
  _id?: string
  title: string
  image?: ImageProps | string
  content: string
  excerpt?: string //content的摘要
  column: string
  createdAt?: string
  author?: string | UserProps
  isHTML?: boolean
}

// 上传文件后返回的数据
export interface ResponseType<P = object> {
  code: number
  msg: string
  data: P
}

export interface GlobalErrorProps {
  status: boolean
  message: string
}

//为了获取state的代码提示，我们需要定义store中state的类型,再传入泛型中
export interface GlobalDataProps {
  user: UserProps
  columns: ColumnProps[]
  posts: PostProps[]
  loading: boolean
  token: string
  error: GlobalErrorProps
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
  return data
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

const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: "get" }
) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    user: { isLogin: false },
    columns: [],
    posts: [],
    loading: false,
    token: localStorage.getItem("token") || "",
    error: { status: false, message: "" },
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
      // 将登录信息存储到localStorage中
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    },
    // 更新用户信息
    fetchCurrentUser(state, rawData) {
      state.user = { ...rawData.data, isLogin: true }
    },
    // 请求失败，更新error信息
    setError(state, err) {
      state.error = err
    },
    // 退出登录(清除vuex、localStorage、请求头中的token)
    logout(state) {
      state.user.isLogin = false
      state.token = ""
      localStorage.removeItem("token")
      delete axios.defaults.headers.common.Authorization
    },

    fetchPost(state, rawData) {
      state.posts = [rawData.data]
    },

    updatePost(state, { data }) {
      state.posts = state.posts.map((post) => {
        if (post._id === data._id) {
          return data
        } else {
          return post
        }
      })
    },
  },

  actions: {
    fetchColumns({ commit }) {
      return getAndCommit("/columns", "fetchColumns", commit)
    },

    fetchColumn({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, "fetchColumn", commit)
    },

    fetchPosts({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, "fetchPosts", commit)
    },

    // 更新文章
    updatePost({ commit }, { id, payload }) {
      return asyncAndCommit(`/post/${id}`, "updatePost", commit, {
        method: "patch",
        data: payload,
      })
    },

    fetchCurrentUser({ commit }) {
      return getAndCommit("/user/current", "fetchCurrentUser", commit)
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

    // 创建文章
    createPost({ commit }, payload) {
      return postAndCommit("/posts", payload, "createPost", commit)
    },

    fetchPost({ commit }, id) {
      return getAndCommit(`/posts/${id}`, "fetchPost", commit)
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

    getCurrentPost(state) {
      return (id: string) => {
        return state.posts.find((post) => post._id === id)
      }
    },
  },
})

export default store
