import { useQuery } from "@tanstack/react-query";
import { SongList } from "./components/test";
import { getMeService } from "@/shared/services/get-me-service";

export function ConfigScreen() {
  const { data } = useQuery({ 
    queryKey: ['user-me'], 
    queryFn: getMeService 
  })

  const components = data?.user.home_components || []
  
  
  return <SongList components={components} />
}