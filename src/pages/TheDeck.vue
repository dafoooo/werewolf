<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import roles from '../data/roles.json'

type Card = {
  id: number
  name: string
  cardId: number
}

const state: { deck: Card[]; pool: Card[]; roleIds: number[] } = reactive({
  deck: [],
  pool: [],
  roleIds: [],
})

onMounted(() => {
  let cardId = 0
  roles.forEach((role) => {
    for (let i = 0; i < role.quantity; i++) {
      let name = role.quantity === 1 ? role.name : `${role.name} #${i + 1}`
      state.pool.push({ id: role.id, name, cardId })
      cardId++
    }
  })
})

const select = (cardId: number) => {
  // validate maximum
  const removedCard = state.deck.find((card) => card.cardId === cardId)
  const selectedCard = state.pool.find((card) => card.cardId === cardId)

  if (removedCard) {
    state.deck.splice(state.deck.indexOf(removedCard), 1)
  } else if (selectedCard) {
    state.deck.push({
      id: selectedCard.id,
      name: selectedCard.name,
      cardId: selectedCard.cardId,
    })
  }

  state.roleIds = state.deck.map((card) => card.id).filter((v, i, a) => a.indexOf(v) === i)

  console.log(state.roleIds)
}

const isSelected = (cardId: number): boolean => {
  return state.deck.find((card) => card.cardId === cardId) ? true : false
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-2xl font-bold uppercase">Pick a card, any card</h1>
        <p class="py-6">
          Sử dụng kinh nghiệm 200 năm cân bằng game <br />
          để bốc một bộ bài thật công bằng cho cả sói và dân.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Số lượng dân</span>
            </label>
            <input type="number" min="0" max="100" placeholder="10" class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Bốc bài</span>
            </label>
            <div class="btn-group btn-group-vertical h-96 overflow-auto">
              <button
                class="btn"
                v-if="state.pool"
                v-for="card in state.pool"
                :class="{ 'btn-active': isSelected(card.cardId) }"
                @click="() => select(card.cardId)"
              >
                {{ card.name }}
              </button>
            </div>
          </div>
          <div class="form-control mt-6">
            <RouterLink class="btn btn-primary px-10 py-2" to="/people">Tiếp</RouterLink>
            <RouterLink to="/" class="btn btn-link text-sm text-secondary"> Thôi </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
