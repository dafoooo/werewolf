<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>

<template>
  <h1 class="text-2xl font-bold uppercase">{{ props.title }}</h1>
</template>
