<script setup lang="ts">
const props = defineProps<{
  text: string
  to?: string
}>()

const emit = defineEmits(['clicked'])
const handleClick = () => emit('clicked')
</script>

<template>
  <RouterLink v-if="props.to" class="btn btn-link text-secondary px-10 py-2 mb-2" :to="props.to">
    {{ props.text }}
  </RouterLink>
  <button v-else class="btn btn-link text-secondary px-10 py-2 mb-2" @click="handleClick">
    {{ props.text }}
  </button>
</template>
