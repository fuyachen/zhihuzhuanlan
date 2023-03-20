<template>
  <form class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">Submit</button>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["from-submit"])

const submitForm = () => {
  emit("from-submit", true)
}
</script>

<style scoped></style>
