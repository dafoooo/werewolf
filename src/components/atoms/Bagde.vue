<script setup lang="ts">
type Badge = {
  type:
    | 'badge-neutral'
    | 'badge-primary'
    | 'badge-secondary'
    | 'badge-accent'
    | 'badge-ghost'
    | 'badge-info'
    | 'badge-success'
    | 'badge-warning'
    | 'badge-error'
    | null
  text: string
}
const props = defineProps<Badge>()
</script>

<template>
  <div class="ml-2 badge" :class="props.type">{{ props.text }}</div>
</template>
