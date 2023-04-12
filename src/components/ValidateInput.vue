<template>
  <div class="validate-input-container pb-3">
    <!-- 父组件传prop：tag或不传，渲染input；否则渲染textarea -->
    <input
      v-if="props.tag !== 'textarea'"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.err }"
      @blur="validation"
      v-model="inputRef.val"
      v-bind="$attrs"
    />
    <textarea
      v-else
      rows="10"
      class="form-control"
      :class="{ 'is-invalid': inputRef.err }"
      v-model="inputRef.val"
      @blur="validation"
      v-bind="$attrs"
    />
    <div v-if="inputRef.err" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
interface RuleProp {
  type: "required" | "email" | "min" | "max" | "custom"
  message: string
  customValidator?: () => boolean
}
export type RulesProp = RuleProp[]
</script>

<script setup lang="ts">
import { reactive, onMounted, computed } from "vue"
import { emitter } from "../ts/mitt"

const props = withDefaults(
  defineProps<{
    rules: RulesProp
    modelValue: string
    tag?: "input" | "textarea"
  }>(),
  {
    tag: "input",
  }
)

const emit = defineEmits(["update:modelValue"])

const inputRef = reactive({
  val: computed({
    get: () => props.modelValue || "",
    set: (val) => {
      emit("update:modelValue", val)
    },
  }),
  err: false,
  message: "",
})

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
        case "custom":
          pass = rule.customValidator()
          break
        default:
          break
      }
      return pass
    })
    inputRef.err = !allPassed
    return allPassed //表单项的验证结果
  }
  return true //如果没有传入规则的话，验证结果就为true
}

onMounted(() => {
  emitter.emit("from-item-created", validation)
})
</script>

<style scoped></style>
