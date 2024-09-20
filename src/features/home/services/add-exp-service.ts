import { api } from "@/shared/lib/axios";
import type { User } from "@/shared/services/get-me-service";

export async function addExpService() {
  const response = await api.post<{ user: User }>('/user/add_exp', {
    exp: 10
  })
  
  return { user: response.data.user }
}