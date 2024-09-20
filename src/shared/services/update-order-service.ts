import { api } from "@/shared/lib/axios";
import type { User } from "./get-me-service";

type UpdateOrderServiceParams = {
  homeComponents: string[]
}

export async function updateOrderService({ homeComponents }: UpdateOrderServiceParams) {
  const response = await api.patch<{ user: User }>('/user/home_components', {
    home_components: homeComponents
  })
  
  return { user: response.data.user }
}