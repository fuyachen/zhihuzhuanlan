<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUpload"
      v-bind="$attrs"
    >
      <slot v-if="fileStatus === 'uploading'" name="uploading"> </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        name="uploaded"
        :uploadedData="uploadedData"
      >
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref, watch } from "vue"
import axios from "axios"

type UploadStatus = "ready" | "uploading" | "success" | "error"
type CheckFuction = (file: File) => boolean

const props = defineProps<{
  action: string
  beforeUpload: CheckFuction
  uploaded: any
}>()

const emit = defineEmits(["file-uploaded", "file-uploaded-error"])

const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>(props.uploaded ? "success" : "ready")
const uploadedData = ref(props.uploaded)
watch(
  () => props.uploaded,
  (newValue) => {
    if (newValue) {
      fileStatus.value = "success"
      uploadedData.value = newValue
    }
  }
)

// 点击上传
const triggerUpload = () => {
  // DOM节点存在，则点击
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// axios发送文件数据
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement
  if (currentTarget.files) {
    const files = Array.from(currentTarget.files)
    // 检查文件类型，不满足则停止后面的逻辑
    if (props.beforeUpload) {
      const result = props.beforeUpload(files[0])
      if (!result) {
        return
      }
    }
    //用户已经选择了文件，则状态变为loading
    fileStatus.value = "uploading"
    const formData = new FormData()
    formData.append("file", files[0])
    axios
      .post(props.action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data)
        fileStatus.value = "success"
        uploadedData.value = res.data
        emit("file-uploaded", res.data)
      })
      .catch((error) => {
        fileStatus.value = "error"
        emit("file-uploaded-error", { error })
      })
      .finally(() => {
        //清空input上的文件
        if (fileInput.value) {
          fileInput.value.value = ""
        }
      })
  }
}
</script>

<style scoped></style>
