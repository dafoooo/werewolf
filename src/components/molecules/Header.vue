// eslint-disable-next-line
<script setup lang="ts">
import PageTitle from '@/components/atoms/PageTitle.vue'
import PageSubtitle from '@/components/atoms/PageSubtitle.vue'
const props = defineProps<{ title: string; subtitle: string }>()
</script>

<template>
  <div class="text-center">
    <PageTitle :title="props.title" />
    <PageSubtitle :subtitle="props.subtitle" />
  </div>
</template>
