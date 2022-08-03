<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { keys as _keys } from 'lodash'

import { useGameStore, type IPlayer } from '@/stores/game'
import { useGameData } from '@/composables/useGameData'
import request from '@/utils/request'
import roleFunctions from '@/data/roleFunctions.json'

import PrimaryButton from '@/components/atoms/PrimaryButton.vue'
import Header from '../components/molecules/Header.vue'
import Bagde from '../components/atoms/Bagde.vue'

const router = useRouter()
const game = useGameStore()
const actions = ref<any>([])

onMounted(async () => {
  if (game.players.length) return

  const res = await request('POST', '/games/current')
  useGameData(res)
})

const getRole = (roleId: number | string): string => {
  return game.turns[roleId][0].roleName
}

const hasAction = (roleId: number | string, action: string): boolean => {
  const player = game.turns[roleId][0]

  if (!player[action].length) {
    return false
  } else if (player[action] == 'can' && player.roleName != 'Sói') {
    return false
  } else {
    return true
  }
}

const noAction = (roleId: number | string) => {
  const noActions =
    !game.turns[roleId][0].function1.length && !game.turns[roleId][0].function2.length
  const noMoreActions = !hasAction(roleId, 'function1') && !hasAction(roleId, 'function2')

  return noActions || noMoreActions
}

const getActionName = (roleId: number | string, action: string): string => {
  return roleFunctions[game.turns[roleId][0][action] as keyof typeof roleFunctions]
}

const getAction = (roleId: number | string, action: string): string => {
  return (game.turns[roleId][0][action] as keyof typeof roleFunctions) || null
}

const submit = async (): Promise<void> => {
  const body = {
    actions: Object.entries(actions.value).map((action: any) => {
      return { action: action[0], target_id: action[1] }
    }),
  }
  const res = await request('POST', '/round/night', body)

  useGameData(res)
  router.push('/day')
}

const isDead = (roleId: number | string): boolean => {
  if (game.turns[roleId][0].roleName != 'Sói') {
    return game.turns[roleId].every((player: IPlayer) => {
      return player.isDead
    })
  } else {
    return !game.players.filter((player) => {
      return (player.function1 == 'can' || player.subRoleName == 'Sói') && !player.isDead
    })
  }
}
</script>

<template>
  <Header title="Đêm" subtitle="Gọi dân dậy theo từng chức năng" />

  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <pre>{{ _keys(game.turns) }}</pre>
      <template v-for="roleId in _keys(game.turns)" :key="roleId">
        <div class="form-control" v-if="game.turns[roleId].length > 0">
          <label class="label">
            <span class="label-text text-base">
              <b>{{ getRole(roleId) }}</b>

              <Bagde v-if="isDead(roleId)" type="badge-primary" text="Đã chết"></Bagde>
              <Bagde v-else-if="noAction(roleId)" type="badge-secondary" text="Vô dụng"></Bagde>
            </span>
          </label>
          <template v-if="!noAction(roleId) && !isDead(roleId)">
            <label
              class="input-group mt-2"
              v-for="action in ['function1', 'function2']"
              :key="action">
              <span v-if="hasAction(roleId, action)" class="text-xs w-36 leading-6">
                {{ getActionName(roleId, action) }}
              </span>
              <span v-if="hasAction(roleId, action)" class="w-full p-0">
                <select
                  class="select select-bordered w-full"
                  v-model="actions[getAction(roleId, action)]">
                  <option :value="null" selected>Không sử dụng chức năng</option>
                  <option
                    v-for="player in game.survivors"
                    :key="player.userId"
                    :value="player.userId">
                    ({{ player.roleName }}) {{ player.name }}
                  </option>
                </select>
              </span>
            </label>
          </template>
        </div>
      </template>
      <div class="form-control mt-1">
        <PrimaryButton text="Hết đêm" @clicked="submit" />
      </div>
    </div>
  </div>
</template>
i
