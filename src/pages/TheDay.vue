<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import request from '@/utils/request.js'
import { useGameStore, type IPlayer } from '@/stores/game'
import { useGameData } from '@/composables/useGameData'

import Header from '../components/molecules/Header.vue'
import PrimaryButton from '../components/atoms/PrimaryButton.vue'
import SecondaryButton from '../components/atoms/SecondaryButton.vue'
import NoteLeft from '../components/atoms/NoteLeft.vue'

const router = useRouter()
const game = useGameStore()
const { result } = storeToRefs(game)
const winner = ref(0)

const bigBrotherWerewolfRoleId = 6
const litteBrotherWerewolfRoleId = 7
const werewolfRoleId = 8
const knightRoleId = 17
const elderRoleId = 19

const morningDeaths = ref<{
  byHanged: number | null
  byKnight: number | null
  byOthers: number[]
}>({
  byHanged: null,
  byKnight: null,
  byOthers: [],
})

onMounted(async () => {
  if (game.players.length) return

  const res = await request('POST', '/games/current')
  useGameData(res)
})

const nextNight = async (): Promise<void> => {
  const res = await request('POST', '/round/next_day')

  useGameData(res)
  router.push('/night')
}

const submit = async (): Promise<void> => {
  const body = {
    deads: morningDeaths.value.byOthers,
    dead_by_vote: [morningDeaths.value.byHanged],
    dead_by_ky_si: [morningDeaths.value.byKnight],
  }

  const res = await request('POST', '/round/day', body)
  useGameData(res)
}

const end = async (): Promise<void> => {
  await request('POST', '/games/finish', {
    result: winner.value,
  })

  window.location.href = '/'
}

const isGrownUp = (player: IPlayer): boolean => {
  return (
    !game.survivors.find((p: IPlayer) => p.roleId == bigBrotherWerewolfRoleId) &&
    player.roleId == litteBrotherWerewolfRoleId
  )
}
</script>

<template>
  <Header
    title="Ngày"
    subtitle="Kể cho dân làng về câu chuyện đêm qua
        <br />
        Lấy bỏng ngô ra mà xem diễn." />

  <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
    <div class="card-body">
      <div>
        <div class="collapse-title font-bold">Tóm tắt kì trước</div>
        <ul class="list-disc list-inside text-xs">
          <template v-if="result.deaths.length">
            <li v-for="death in result.deaths" :key="death">{{ death }} chết</li>
          </template>
          <li v-if="!result.deaths.length">Không có ai chết</li>
          <template v-if="result.silents.length">
            <li v-for="silent in result.silents" :key="silent.name">{{ silent.name }} bị liễu</li>
          </template>
          <li v-for="other in result.others" :key="other">
            {{ other }}
          </li>
        </ul>
      </div>

      <div class="collapse collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title font-bold">Drama</div>
        <div class="collapse-content whitespace-pre-wrap break-words">
          <p class="text-xs">{{ game.log }}</p>
        </div>
      </div>

      <div class="collapse collapse-arrow">
        <input type="checkbox" />
        <div class="collapse-title font-bold">Những người sắp chết</div>
        <div class="collapse-content">
          <div class="form-control">
            <NoteLeft>Chọn dân để giết cho vui:</NoteLeft>
            <label class="label items-start" v-for="player in game.survivors" :key="player.userId">
              <div class="">
                <div class="label-text">({{ player.roleName }}) {{ player.name }}</div>
                <NoteLeft v-if="player.isLink">Cặp đôi</NoteLeft>
                <NoteLeft v-if="player.isDad">
                  Cha của {{ game.survivors.find((p: IPlayer) => p.isSon)?.name }}
                </NoteLeft>
                <NoteLeft v-if="player.isSon && player.subRoleId == werewolfRoleId">
                  Đã hoá sói
                </NoteLeft>
                <NoteLeft v-else-if="player.isSon && player.subRoleId != werewolfRoleId">
                  Con của {{ game.survivors.find((p: IPlayer) => p.isDad)?.name }}
                </NoteLeft>
                <NoteLeft v-if="isGrownUp(player)">Đã lộ diện</NoteLeft>
                <NoteLeft v-if="player.roleId == elderRoleId && !player.hiddenFunction">
                  Đã bị cắn
                </NoteLeft>
              </div>
              <input
                v-model="morningDeaths.byOthers"
                :value="player.userId"
                type="checkbox"
                class="checkbox checkbox-primary" />
            </label>
          </div>
        </div>
      </div>

      <div class="collapse-title font-bold">Câu chuyện sáng nay</div>
      <div class="form-control">
        <label class="input-group mb-2">
          <span class="text-xs w-36 leading-6 pr-4">Treo cổ</span>
          <span class="w-full p-0">
            <select v-model="morningDeaths.byHanged" class="select select-bordered w-full">
              <option :value="null" selected>Chưa chọn ai</option>
              <option v-for="player in game.survivors" :key="player.userId" :value="player.userId">
                ({{ player.roleName }}) {{ player.name }}
              </option>
            </select>
          </span>
        </label>
        <label class="input-group mb-2" v-if="game.survivors.find((p) => p.roleId == knightRoleId)">
          <span class="text-xs w-36 leading-6 pr-4">Kị sỹ lật bài</span>
          <span class="w-full p-0">
            <select v-model="morningDeaths.byKnight" class="select select-bordered w-full">
              <option :value="null" selected>Chưa chọn ai</option>
              <option v-for="player in game.survivors" :key="player.userId" :value="player.userId">
                ({{ player.roleName }}) {{ player.name }}
              </option>
            </select>
          </span>
        </label>
      </div>
      <div class="form-control mt-1">
        <SecondaryButton @clicked="submit" text="Submit" />
        <PrimaryButton @clicked="nextNight" text="Hết ngày" />
        <label for="end" class="btn btn-link text-error modal-button">Kết thúc game</label>
      </div>
    </div>
  </div>

  <input type="checkbox" id="end" class="modal-toggle" />
  <label for="end" class="modal cursor-pointer">
    <label class="modal-box relative text-center" for="end">
      <label class="label">
        <span class="label-text text-base">Chọn bên thắng</span>
      </label>
      <select v-model="winner" class="select select-bordered w-full">
        <option :value="0" selected>Dân</option>
        <option :value="1" selected>Sói</option>
        <option :value="0" selected>Phe thứ ba</option>
      </select>
      <button class="btn btn-error my-3" @click="end">Kết thúc game</button>
    </label>
  </label>
</template>
