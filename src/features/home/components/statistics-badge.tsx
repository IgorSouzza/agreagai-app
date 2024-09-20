import { Flame } from "lucide-react-native";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

type StatisticsBadgeProps = {
  title: string
  description: string
  icon: ReactNode
}

export function StatisticsBadge({ title, description, icon }: StatisticsBadgeProps) {
  return (
    <View className="flex flex-row gap-2 border rounded-lg p-4 m-2 border-zinc-300">
      {icon}
      <View className="flex flex-col">
        <Text className="text-2xl font-semibold text-zinc-600">{title}</Text>
        <Text className="text-zinc-400">{description}</Text>
      </View>
    </View>
  )
}