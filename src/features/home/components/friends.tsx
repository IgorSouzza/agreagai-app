import { Text, View } from "react-native";

export function Friends() {
  return (
    <View>
      <View className="flex justify-between w-full items-center flex-row mb-4">
        <Text className="text-zinc-600 text-2xl font-semibold">Amigos</Text>
        <Text className="text-sky-400 font-semibold">Adicionar amigos</Text>
      </View>
      <View className="border rounded-lg border-zinc-300 p-4">
        <Text className="text-zinc-500 text-xl font-medium leading-6 text-center">
          Economizar é mais divertido e efetivo quando você se conecta
          com outros.
        </Text>
      </View>
    </View>
  )
}