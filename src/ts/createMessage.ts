import Message from "@/components/Message.vue"
import { createApp } from "vue"

// ts不支持vue模板文件，不能直接将type调用过来，还要再定义一遍
export type AlertType = "success" | "error" | "default"

const createMessge = (
  message: string,
  alertType: AlertType,
  timeout: number
) => {
  const msgModel = createApp(Message, { message, alertType })
  const node = document.createElement("div")
  document.body.appendChild(node)
  msgModel.mount(node)
  // n秒后，自动关闭提示组件，移除挂载的节点
  setTimeout(() => {
    msgModel.unmount()
    document.body.removeChild(node)
  }, timeout)
}

export default createMessge
