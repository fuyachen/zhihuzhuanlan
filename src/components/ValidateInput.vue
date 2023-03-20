<template>
  <div class="validate-input-container pb-3">
    <input
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.err }"
      v-model="inputRef.val"
      @blur="validation"
    />
    <div v-if="inputRef.err" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
interface RuleProp {
  type: "required" | "email"
  message: string
}

export type RulesProp = RuleProp[]
</script>

<script setup lang="ts">
import { reactive } from "vue"

const inputRef = reactive({
  val: "",
  err: false,
  message: "",
})

const props = defineProps<{ rules: RulesProp }>()
const emailReg = /^.+@[a-zA-Z0-9-]+\.([a-zA-Z0-9-]+)$/

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
