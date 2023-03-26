<template>
  <Teleport to="#alert">
    <div
      class="alert alert-primary message-info fixed-top mx-auto w-50 d-flex justify-content-between mt-2"
      role="alert"
      :class="alertStyle"
      v-if="isVisible"
    >
      <span>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click.prevent="hide"
      ></button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useDOMCreate from "@/hooks/useDOMCreate"

export type AlertType = "success" | "error" | "default"

const props = withDefaults(
  defineProps<{
    message: string
    alertType: AlertType
  }>(),
  {
    alertType: "default",
  }
)

useDOMCreate("alert")

const alertStyle = {
  "alert-success": props.alertType === "success",
  "alert-danger": props.alertType === "error",
  "alert-primary": props.alertType === "default",
}
const isVisible = ref(true)
const hide = () => {
  isVisible.value = false
}
</script>
