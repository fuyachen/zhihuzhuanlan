import mitt from "mitt"
import { onUnmounted } from "vue"

// ValidteFunc是表单项中的验证函数，返回一个boolean
export type ValidteFunc = () => boolean

// funcArr是由表单验证函数组成的数组
export let funcArr: ValidteFunc[] = []

// 创建一个Events类型，让事件和回调函数的参数类型一一对应
type Events = {
  "from-item-created": ValidteFunc
}

// 创建mitt实例
export const emitter = mitt<Events>()

export function mittEvent(callback: (func: ValidteFunc) => void) {
  emitter.on("from-item-created", callback)

  onUnmounted(() => {
    emitter.off("from-item-created", callback)
    funcArr = []
  })
}
