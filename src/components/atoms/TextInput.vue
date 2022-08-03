<script setup lang="ts">
import { computed } from 'vue'

type InputProp = {
  label: string
  required: boolean
  minlength: string | number
  maxlength: string | number
  placeholder: string
  modelValue: string | null
}

const props = defineProps<InputProp>()
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('update:modelValue', value)
  },
})
</script>
<template>
  <div class="form-control">
    <label class="input-group">
      <span class="text-xs w-40 leading-6">{{ props.label }}</span>
      <input
        type="text"
        class="input w-full input-bordered"
        :required="props.required"
        :minlength="props.minlength"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        v-model="model" />
    </label>
  </div>
</template>
