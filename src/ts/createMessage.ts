import Message from "@/components/Message.vue"
import { h, render } from "vue"

// ts不支持vue模板文件，不能直接将type调用过来，还要再定义一遍
export type AlertType = "success" | "error" | "default"

const createMessge = (
  message: string,
  alertType: AlertType,
  timeout?: 2000
) => {
  // 使用h函数创建 类型为Message，props为 message, alertType 的虚拟节点
  const msgVnode = h(Message, { message, alertType })
  const node = document.createElement("div")
  document.body.appendChild(node)
  // 使用render函数将虚拟节点渲染到DOM节点上
  render(msgVnode, node)
  // 有时我们希望可以调用函数才能关闭提示信息
  const destroy = () => {
    // 卸载虚拟节点
    render(null, node)
    document.body.removeChild(node)
  }
  // 如果传参timeout则自动关闭提示信息，否则需要手动调用destory
  if (timeout) {
    setTimeout(() => {
      destroy()
    }, timeout)
  }
  return destroy
}

export default createMessge
