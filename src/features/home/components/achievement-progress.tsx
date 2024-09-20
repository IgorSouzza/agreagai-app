import { View } from "react-native";

type AchievementProgressProps = {
  percent: number
}

export function AchievementProgress({ percent }: AchievementProgressProps) {
  return (
    <View className="h-4 w-full rounded-lg bg-yellow-300 flex justify-center">
      <View className="h-4 bg-yellow-200 rounded-lg" style={{ width: `${percent}%` }} />
    </View>
  )
}