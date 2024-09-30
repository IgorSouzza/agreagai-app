import { api } from "@/shared/lib/axios";

export type User = {
  name: string,
  level: number,
  exp: number,
  exp_to_level_up: number,
  achievements: [],
  leveled_up: boolean,
  home_components: {
    id: string
    label: string
    active: boolean
  }[]
}

export async function getMeService() {
  const response = await api.get<{ user: User }>('/user/me')

  return { user: response.data.user }
}