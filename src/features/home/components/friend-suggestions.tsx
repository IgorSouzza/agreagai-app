import { X } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import colors from "tailwindcss/colors";

export function FriendSuggestions() {
  const suggestions = [
    {
      name: 'Igor Souza',
      pictureUrl: 'https://github.com/igorSouzza.png'
    },
  ]

  return (
    <View>
      <View className="flex justify-between w-full items-center flex-row mb-4">
        <Text className="text-zinc-600 text-2xl font-semibold">Sugestões de amizades</Text>
      </View>
      {suggestions.map(suggestion => (
        <View 
          key={suggestion.name}
          className="border rounded-lg border-zinc-300 p-4 flex flex-row justify-between gap-2 items-center" 
        >
          <View className="flex flex-row items-center gap-4">
            <Image 
              source={{ uri: suggestion.pictureUrl }} 
              className="w-8 h-8 rounded-full" 
            />
            <Text className="text-zinc-500 text-xl font-medium">
              {suggestion.name}
            </Text>
          </View>
          <View className="flex flex-row gap-2 items-center">
            <Pressable className="px-3 py-1 bg-sky-400 rounded-lg border-b-sky-600 border-b-4">
              <Text className="text-white text-2xl">+</Text>
            </Pressable>
            <Pressable className="px-3 py-1">
              <X size={20} color={colors.zinc[400]} />
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  )
}