<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.err }"
      :value="inputRef.val"
      @blur="validation"
      @input="updateValue"
      v-bind="$attrs"
    />
    <div v-if="inputRef.err" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
interface RuleProp {
  type: "required" | "email" | "min" | "max"
  message: string
}

export type RulesProp = RuleProp[]
</script>

<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  rules: RulesProp
  modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])

const inputRef = reactive({
  val: props.modelValue || "",
  err: false,
  message: "",
})

const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  // 更新对应表单的值，为input的value
  inputRef.val = targetValue
  emit("update:modelValue", targetValue)
}

const emailReg = /^.+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)$/
const minReg = /^[.\S]{6,}$/
const maxReg = /^[.\S]{6,16}$/

const validation = () => {
  if (props.rules) {
    // debugger
    const allPassed = props.rules.every((rule) => {
      let pass = true
      inputRef.message = rule.message
      switch (rule.type) {
        case "required":
          pass = inputRef.val.trim() !== ""
          break
        case "email":
          pass = emailReg.test(inputRef.val)
          break
        case "min":
          pass = minReg.test(inputRef.val)
          break
        case "max":
          pass = maxReg.test(inputRef.val)
          break
        default:
          break
      }
      return pass
    })
    inputRef.err = !allPassed
  }
}
</script>

<style scoped></style>
