import { ref, onMounted, onUnmounted, Ref } from "vue"

// Ref<null|HTMLElement>返回的是一个类型为null或HTMLElement的响应式对象
const useClickOutside = function (elementRef: Ref<HTMLElement | null>) {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      //挂载完成，获取到DOM元素，再进行判断
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }

  // 元素显然完成后，再监听点击事件
  onMounted(() => {
    document.addEventListener("click", handler)
  })

  // 卸载后，清除监听，防止内存泄漏
  onUnmounted(() => {
    document.removeEventListener("click", handler)
  })

  return isClickOutside
}

export default useClickOutside
