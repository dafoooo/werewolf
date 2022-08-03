import axios, { type AxiosRequestConfig } from 'axios'
import { useGameStore } from '@/stores/game'

const game = useGameStore()
const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' = 'GET',
  url: string,
  params: any = {},
  options: any = {},
) => {
  const body: AxiosRequestConfig = {
    method,
    url: import.meta.env.VITE_API_ENDPOINT + url,
    ...options,
  }

  params.village_id = game.currentVillage

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    body.data = params
  } else {
    body.params = params
  }

  try {
    const response = await axios(body)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.data
  }
}

export default request
