import { Flame } from "lucide-react-native";
import { Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { AchievementProgress } from "./achievement-progress";
import type { ReactNode } from "react";

type AchievementItemProps = {
  title: string
  progressLabel: string
  description: string
  progressPercentage: number
  icon: ReactNode
  backgroundColor: string
}

export function AchievementItem({ title, description, progressLabel, progressPercentage, icon, backgroundColor }: AchievementItemProps) {
  return (
    <View className="flex flex-row gap-4 border-b border-zinc-300 py-4 items-center relative w-full">
      <Text className="absolute text-sm right-2 text-zinc-400 top-6">{progressLabel}</Text>
      <View className={`flex items-center justify-center p-6 rounded-2xl ${backgroundColor}`}>
        {icon}
      </View>
      <View className="w-[255px]">
        <Text className="text-2xl text-zinc-600 font-semibold mb-4">{title}</Text>
        <AchievementProgress percent={progressPercentage} />
        <Text className="text-sm text-zinc-400 mt-4">{description}</Text>
      </View>
    </View>
  )
}