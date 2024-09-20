import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type HeroProps = {
  name: string
}

export function Hero({ name }: HeroProps) {
  return (
    <View className="bg-violet-400">
      <SafeAreaView>
        <View className="flex flex-row items-center gap-4">
          <View className="px-4 py-10 pb-0">
            <Text className="text-2xl font-semibold text-white">Bem-vindo, {name}!</Text>
            <Text className="text-sm text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laudantium dolor debitis voluptatum, nesciunt provident nostrum.</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}