<script setup lang="ts">
import { useGameStore, type ICard } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import roles from '@/data/roles.json'
import PrimaryButton from '@/components/atoms/PrimaryButton.vue'
import TextButton from '@/components/atoms/TextButton.vue'
import Header from '../components/molecules/Header.vue'

const game = useGameStore()
const { deck } = storeToRefs(game)
const { getCardFromDeck, getCardFromPool, setPool, addToDeck, removeFromDeck, setPopulation } = game
const count = ref<number>(0)

onMounted(() => {
  const tmpPool: ICard[] = []
  let id = 0
  roles.forEach((role) => {
    for (let i = 0; i < role.quantity; i++) {
      const name = role.quantity === 1 ? role.roleName : `${role.roleName} #${i + 1}`
      tmpPool.push({ id, name, ...role })
      id++
    }
  })

  setPool(tmpPool)
})

const select = (id: number): void => {
  const removedCard = getCardFromDeck(id)
  const selectedCard = getCardFromPool(id)

  if (removedCard) {
    removeFromDeck(removedCard)
  } else if (selectedCard) {
    if (deck.value.length < count.value) addToDeck(selectedCard)
  }
}

const isSelected = (id: number): boolean => {
  return !!getCardFromDeck(id)
}
</script>

<template>
  <Header
    title="Pick a card, any card"
    subtitle="Sử dụng kinh nghiệm 200 năm cân bằng game <br />
      để setup một bộ bài thật công bằng cho cả làng." />
  <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
    <div class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Số lượng dân</span>
        </label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="10"
          v-model="count"
          @blur="setPopulation(count)"
          class="input input-bordered" />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Bốc bài</span>
        </label>
        <div
          v-if="game.pool"
          class="btn-group btn-group-vertical h-96 overflow-y-auto overflow-x-hidden">
          <button
            class="btn"
            v-for="card in game.pool"
            :key="card.id"
            :class="{ 'btn-active': isSelected(card.id) }"
            @click="() => select(card.id)">
            {{ card.name }}
          </button>
        </div>
      </div>
      <div class="form-control mt-2">
        <PrimaryButton to="/player" text="Tiếp" />
        <TextButton to="/" text="Thôi" />
      </div>
    </div>
  </div>
</template>
