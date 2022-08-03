import { defineStore } from 'pinia'
import { groupBy as _groupBy, sortBy as _sortBy } from 'lodash'

interface IRole {
  roleId: number
  roleName: string
  function1: string
  function2: string
  hiddenFunction: string
  quantity: number
  priority: number
}

export interface ICard extends IRole {
  id: number
  name: string
}

export interface IPlayer extends IRole {
  id?: number
  userId?: number
  name: string
  subRoleId?: number
  subRoleName?: string
  isDead?: boolean
  isLink?: boolean
  isDad?: boolean
  isSon?: boolean
}

export interface IResult {
  deaths: string[]
  silents: { name: string }[]
  others: string[]
}

export interface RootState {
  villageId: number | null
  deck: ICard[]
  pool: ICard[]
  roleIds: number[]
  players: IPlayer[]
  population: number
  result: IResult
  log: string
  turns: any
}

const defaultState = {
  villageId: null,
  deck: [],
  pool: [],
  roleIds: [],
  players: [],
  population: 0,
  result: {
    deaths: [],
    silents: [],
    others: [],
  },
  log: '',
  turns: {},
}

export const useGameStore = defineStore({
  id: 'game',
  state: (): RootState => defaultState,
  getters: {
    survivors(): IPlayer[] {
      return this.players.filter((player: IPlayer) => !player.isDead)
    },
    currentVillage(): number {
      return this.villageId || parseInt(localStorage.getItem('villageId') as string)
    },
  },
  actions: {
    sortDeckById(): ICard[] {
      return this.deck.sort((a, b) => a.id - b.id)
    },
    getCardFromPool(id: number): ICard | undefined {
      return this.pool.find((card) => card.id === id)
    },
    getCardFromDeck(id: number): ICard | undefined {
      return this.deck.find((card) => card.id === id)
    },
    setPool(pool: ICard[]): void {
      this.pool = pool
    },
    setTurns(): void {
      this.turns = _groupBy(_sortBy(this.players, 'priority'), 'roleId') as any
      this.turns[8] = [{ roleName: 'Sói', function1: 'can', function2: '' }]
    },
    setLog(log: string): void {
      this.log = log
    },
    setResult(result: IResult): void {
      this.result = result
    },
    setVillageId(id: number): void {
      this.villageId = id
      localStorage.setItem('villageId', this.villageId.toString())
    },
    addToDeck(card: ICard): void {
      this.deck.push(card)
    },
    removeFromDeck(card: ICard): void {
      this.deck.splice(this.deck.indexOf(card), 1)
    },
    setPlayers(players: IPlayer[]): void {
      this.players = players
    },
    setPopulation(population: number): void {
      this.population = population
    },
  },
})
