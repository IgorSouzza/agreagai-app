import { api } from "@/shared/lib/axios";
import type { User } from "./get-me-service";

type ToggleHomeComponentServiceParams = {
  id: string
  active: boolean
}

export async function toggleHomeComponentService({ id, active }: ToggleHomeComponentServiceParams) {
  const response = await api.patch<{ user: User }>('/user/toggle_home_components', {
    id,
    active
  })
  
  return { user: response.data.user }
}