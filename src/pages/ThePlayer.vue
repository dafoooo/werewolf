<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import request from '@/utils/request'
import { useGameData } from '@/composables/useGameData'
import { useGameStore, type ICard, type IPlayer } from '@/stores/game'

import Card from '@/components/organisms/Card.vue'
import Header from '../components/molecules/Header.vue'
import TextInput from '../components/atoms/TextInput.vue'
import PrimaryButton from '../components/atoms/PrimaryButton.vue'
import TextButton from '../components/atoms/TextButton.vue'

const router = useRouter()
const game = useGameStore()
const sortedDeck: ICard[] = game.deck.sort((a, b) => a.id - b.id)
const listPlayers = ref<IPlayer[]>(
  sortedDeck.map((card) => {
    return { ...card, name: '' }
  }),
)

const submit = async (): Promise<void> => {
  const body = {
    count: game.population,
    users: listPlayers.value.map((player) => {
      return { name: player.name, role_id: player.roleId }
    }),
  }

  const result = await request('POST', '/games', body)

  useGameData(result)

  router.push('/night')
}
</script>

<template>
  <div>
    <Header
      title="Gán chức năng cho các con dân"
      subtitle="Bảo mọi người nhắm mắt lại, giơ bài lên." />

    <Card>
      <template v-slot:content>
        <template v-for="(card, index) in sortedDeck" :key="index">
          <TextInput
            :label="card.name"
            :model-value="listPlayers[index].name"
            required
            minlength="0"
            maxlength="15"
            placeholder="Tên khai sinh"
            v-model="listPlayers[index].name" />
        </template>
      </template>

      <template v-slot:button-group>
        <PrimaryButton @clicked="submit" text="Chơi" />
        <TextButton to="/deck" text="Lại" />
      </template>
    </Card>
  </div>
</template>
