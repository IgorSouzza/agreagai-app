import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";
import { addExpService } from "../services/add-exp-service";
import { addLevelService } from "../services/add-level-service";

export function Admin() {
  const queryClient = useQueryClient()
  const { mutate: addExpServiceFn } = useMutation({
    mutationFn: addExpService,
    onSuccess: () => {
      console.log('EXP adicionado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['user-me'] })
    }
  })

  const { mutate: addLevelServiceFn } = useMutation({
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
            <Pressable 
              className="px-3 py-1 bg-sky-400 rounded-lg border-b-sky-600 border-b-4"
              onPress={() => addExpServiceFn()}
            >
              <Text className="text-white text-2xl">+</Text>
            </Pressable>
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
            <Pressable 
              className="px-3 py-1 bg-sky-400 rounded-lg border-b-sky-600 border-b-4"
              onPress={() => addLevelServiceFn()}
            >
              <Text className="text-white text-2xl">+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}