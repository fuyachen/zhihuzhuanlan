import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

// 配置全局axios
axios.defaults.baseURL = "http://apis.imooc.com/api/"

axios.interceptors.request.use((config) => {
  store.commit("setLoading", true)
  // 重置error状态，否则错误信息只能提示一次
  store.commit("setError", { status: false, message: "" })
  if (config.method.toUpperCase() === "GET") {
    config.params = { ...config.params, icode: "B55BE08D3054EC26" }
  } else {
    //其他请求
    if (config.data instanceof FormData) {
      config.data.append("icode", "B55BE08D3054EC26")
    } else {
      config.data = { ...config.data, icode: "B55BE08D3054EC26" }
    }
  }
  return config
})

axios.interceptors.response.use(
  (config) => {
    setTimeout(() => {
      store.commit("setLoading", false)
    }, 200)
    return config
  },
  // 错误处理
  (err) => {
    const { error } = err.response.data
    store.commit("setError", { status: true, message: error })
    // 请求失败，要关闭loading效果
    store.commit("setLoading", false)
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
