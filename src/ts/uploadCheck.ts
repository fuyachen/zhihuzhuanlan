// 验证上传文件的格式和大小
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
