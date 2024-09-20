import { Text, View } from "react-native";
import { StatisticsBadge } from "./statistics-badge";
import { Flame, Gamepad, Trophy, Zap } from "lucide-react-native";
import colors from 'tailwindcss/colors'
import type { User } from "@/shared/services/get-me-service";

type StatisticsProps = {
  user: User
}

export function Statistics({ user }: StatisticsProps) {
  return (
    <View>
      <Text className="text-zinc-600 text-2xl mb-4 font-semibold">Estatísticas</Text>
      <View className="flex flex-row flex-wrap">
        <View className="w-1/2">
          <StatisticsBadge 
            title="1" 
            description="Dias seguidos"
            icon={<Flame size={20} color={colors.red[400]} style={{ marginTop: 4 }} />}
          />
        </View>
        <View className="w-1/2">
          <StatisticsBadge 
            title="Ouro" 
            description="Liga" 
            icon={<Trophy size={20} style={{ marginTop: 4 }} />}
          />
        </View>
        <View className="w-1/2">
          <StatisticsBadge 
            title={user.level.toString()}
            description="Level" 
            icon={<Gamepad color={colors.zinc[600]} size={20} style={{ marginTop: 4 }} />}
          />
        </View>
        <View className="w-1/2">
          <StatisticsBadge 
            title={user.exp.toString()}
            description="Total EXP" 
            icon={<Zap size={20} color={colors.amber[400]} style={{ marginTop: 4 }} />}
          />
        </View>
      </View>
    </View>
  )
}