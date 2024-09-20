import { Text, View } from "react-native";
import { AchievementItem } from "./achievement-item";
import { Flame, WandSparkles } from "lucide-react-native";
import colors from "tailwindcss/colors";
import type { User } from "@/shared/services/get-me-service";

type AchievementsProps = {
  user: User
}

export function Achievements({ user }: AchievementsProps) {
  return (
    <View>
      <View className="flex justify-between w-full items-center flex-row mb-4">
        <Text className="text-zinc-600 text-2xl font-semibold">Conquistas</Text>
      </View>
      <View className="border rounded-lg border-zinc-300 p-4 w-full">
        <AchievementItem
          title="Fogo selvagem"
          description="Consiga uma sequência de 3 dias"
          progressLabel="1/3"
          progressPercentage={33}
          backgroundColor="bg-red-400"
          icon={<Flame size={32} color={colors.white} />}
        />
        <AchievementItem
          title="Mago"
          description="Ganhe 100 EXP"
          progressLabel={`${user.exp}/100`}
          progressPercentage={Math.round((user.exp / 100) * 100)}
          backgroundColor="bg-lime-400"
          icon={<WandSparkles size={32} color={colors.white} />}
        />
        <Text className="mt-4 text-lg text-zinc-600">Ver todas</Text>
      </View>
    </View>
  )
}