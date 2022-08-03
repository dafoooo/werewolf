<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game.js'
import request from '@/utils/request'

import Header from '../components/molecules/Header.vue'
import PrimaryButton from '../components/atoms/PrimaryButton.vue'

const router = useRouter()
const game = useGameStore()
const selectedVillage = ref<number>(0)
const villages = ref<{ id: number; name: string }[]>([])

onMounted(async () => {
  const result = await request('GET', '/top_page')
  villages.value = result.villages
})

// const villages = [
//   { id: 1, name: 'Lần Đàng' },
//   { id: 2, name: 'Vũ Đại' },
// ]

const play = () => {
  game.setVillageId(selectedVillage.value)
  router.push('/deck')
}
</script>

<template>
  <Header title="Ma Sói" subtitle="Chọn làng mà chơi" />
  <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
    <div class="card-body">
      <select v-model="selectedVillage" class="select select-bordered w-full">
        <option :value="0" selected>Chọn làng</option>
        <option v-for="village in villages" :key="village.id" :value="village.id">
          {{ village.name }}
        </option>
      </select>
      <PrimaryButton
        @clicked="play"
        :class="{ 'btn-ghost btn-disabled': selectedVillage == 0 }"
        text="Chơi
      luôn" />
    </div>
  </div>
</template>
