<script setup lang="ts">
const props = defineProps<{ subtitle: string }>()
</script>

<template>
  <p class="py-6" v-html="props.subtitle"></p>
</template>
