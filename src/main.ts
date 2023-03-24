import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"

// 配置全局axios
axios.defaults.baseURL = "http://apis.imooc.com/api/"

axios.interceptors.request.use((config) => {
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

const app = createApp(App)

app.use(router)
app.use(store)

app.mount("#app")
