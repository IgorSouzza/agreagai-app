import type { User } from "@/shared/services/get-me-service";
import { Text, View } from "react-native";

type InfoProps = {
  user: User
}

export function Info({ user }: InfoProps) {
  return (
    <View className="flex flex-row justify-center gap-8 mb-6 border-b border-zinc-300 pb-4">
      <View className="flex flex-row gap-1">
        <Text className="font-medium">Nível:</Text>
        <Text>{user.level}</Text>
      </View>
      <View className="flex flex-row gap-1">
        <Text className="font-medium">Experiência:</Text>
        <Text>{user.exp}/{user.exp_to_level_up}</Text>
      </View>
      <View className="flex flex-row gap-1">
        <Text className="font-medium">Conquistas:</Text>
        <Text>{user.achievements.length}</Text>
      </View>
    </View>
  )
}