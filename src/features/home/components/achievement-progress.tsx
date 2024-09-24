import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type AchievementProgressProps = {
  percent: number
}

export function AchievementProgress({ percent }: AchievementProgressProps) {
  const sharedProgress = useSharedValue(percent)

  const styleAnimated = useAnimatedStyle(() => ({
    width: `${sharedProgress.value}%`
  }))

  useEffect(() => {
    sharedProgress.value = withTiming(percent)
  }, [percent])

  return (
    <View className="h-4 w-full rounded-lg bg-yellow-400 flex justify-center">
      <Animated.View className="h-4 bg-yellow-300 rounded-lg" style={[styleAnimated]} />
    </View>
  )
}