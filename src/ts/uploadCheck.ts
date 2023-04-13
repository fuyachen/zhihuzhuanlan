// 验证上传文件的格式和大小

import createMessge from "./createMessage"
interface CheckCondition {
  format?: string[]
  size?: number
}

type ErrorType = "null" | "size" | "format"

export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  // 验证类型是否符合要求
  const isValidFomat = format ? format.includes(file.type) : true
  // 大小限制(mb)
  const isValidSize = size ? file.size / 1024 / 1024 < size : true
  // 错误信息提示
  let error: ErrorType = null
  if (!isValidFomat) {
    error = "format"
  }
  if (!isValidSize) {
    error = "size"
  }
  return {
    passed: isValidFomat && isValidSize,
    error,
  }
}

export const commonUploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ["image/jpeg", "image/png"],
    size: 1,
  })
  const { passed, error } = result
  if (error === "format") {
    createMessge("上传图片只能是 JPG/PNG 格式!", "error", 2000)
  }
  if (error === "size") {
    createMessge("上传图片大小不能超过 1Mb", "error", 2000)
  }
  return passed
}
