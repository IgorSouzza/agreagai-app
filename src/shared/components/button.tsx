import { LoaderCircle } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

type ButtonProps = {
  isLoading?: boolean
} & PressableProps

export function Button({ isLoading, children, ...props }: ButtonProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (isLoading) {
      // Inicia a rotação infinita
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000, // Tempo para completar uma volta
          easing: Easing.linear,
        }),
        -1, // Repetir infinitamente
        false // Não inverter
      );
    } else {
      // Para a animação
      cancelAnimation(rotation);
      rotation.value = 0; // Reseta a rotação
    }
  }, [isLoading])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Pressable 
      {...props}
      className="px-3 py-1 bg-sky-400 rounded-lg border-b-sky-600 border-b-4 min-w-[20px] min-h-[30px] flex items-center justify-center"
    >
      {isLoading ? 
        <Animated.View style={[animatedStyle]}>
          <LoaderCircle size={12}  />
        </Animated.View> 
        : children
      }
    </Pressable>
  )
}