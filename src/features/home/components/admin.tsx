import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";
import { addExpService } from "../services/add-exp-service";
import { addLevelService } from "../services/add-level-service";
import { LoaderCircle } from "lucide-react-native";
import { Button } from "@/shared/components/button";

export function Admin() {
  const queryClient = useQueryClient()
  const { mutate: addExpServiceFn, isPending: isPendingAddExpService } = useMutation({
    mutationFn: addExpService,
    onSuccess: () => {
      console.log('EXP adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['user-me'] })
    }
  })

  const { mutate: addLevelServiceFn, isPending: isPendingAddLevelService } = useMutation({
    mutationFn: addLevelService,
    onSuccess: () => {
      console.log('Level adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['user-me'] })
    }
  })

  return (
    <View>
      <View className="flex justify-between w-full items-center flex-row mb-4">
        <Text className="text-zinc-600 text-2xl font-semibold">Admin</Text>
      </View>
      <View className="flex flex-col gap-4">
        <View 
          className="border rounded-lg border-zinc-300 p-4 flex flex-row justify-between gap-2 items-center" 
        >
          <View className="flex flex-row items-center gap-4">
            <Text className="text-zinc-500 text-xl font-medium">
              Adicionar 10 EXP
            </Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
          <Button 
              onPress={() => addExpServiceFn()}
              isLoading={isPendingAddExpService}
            >
              <Text className="text-white">+</Text>
            </Button>
          </View>
        </View>
        <View 
          className="border rounded-lg border-zinc-300 p-4 flex flex-row justify-between gap-2 items-center" 
        >
          <View className="flex flex-row items-center gap-4">
            <Text className="text-zinc-500 text-xl font-medium">
              Adicionar 1 level
            </Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <Button 
              onPress={() => addLevelServiceFn()}
              isLoading={isPendingAddLevelService}
            >
              <Text className="text-white">+</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}