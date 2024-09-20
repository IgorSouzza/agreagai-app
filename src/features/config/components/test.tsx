// Expo SDK40
// expo-blur: ~8.2.2
// expo-haptics: ~8.4.0
// react-native-gesture-handler: ~1.8.0
// react-native-reanimated: ^2.0.0-rc.0
// react-native-safe-area-context: 3.1.9

import React, { useState } from 'react';
import {
  Image,
  Platform,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { Menu } from 'lucide-react-native';
import colors from "tailwindcss/colors";
import { updateOrderService } from '@/shared/services/update-order-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleHomeComponentService } from '@/shared/services/toggle-home-component-service';

function clamp(value, lowerBound, upperBound) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}

function objectMove(object, from, to) {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}

function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

const SONG_HEIGHT = 70;
const SCROLL_HEIGHT_THRESHOLD = SONG_HEIGHT;

function Song({ id, title, active, setActive }) {
  const queryClient = useQueryClient()
  const { mutateAsync: updateOrderFn } = useMutation({
    mutationFn: toggleHomeComponentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] })
    }
  })
  const apiCall = async (active) => {
    try {
      await updateOrderFn({ id, active })
    } catch (error) {
      console.error('Erro ao chamar API:', error);
    }
  };

  return (
    <View
      className='flex flex-row items-center p-[10px] w-full'
      style={{
        height: SONG_HEIGHT,
      }}
    >
      <Menu size={25} color={colors.zinc[300]} />

      <View
        style={{
          marginLeft: 10,
        }}
      >
        <View className='flex flex-row w-full items-center justify-between'>
          <Text className='text-base font-medium mb-1'>
            {title}
          </Text>
          <Switch
            trackColor={{false: colors.zinc[300], true: colors.emerald[400]}}
            thumbColor={colors.white}
            ios_backgroundColor={active ? colors.emerald[400]: colors.zinc[300]}
            onValueChange={(active) => {
              apiCall(active)
              setActive(active)
            }}
            value={active}
          />
        </View>
      </View>
    </View>
  );
}

function MovableSong({
  id,
  title,
  active,
  positions,
  scrollY,
  songsCount,
}) {
  const queryClient = useQueryClient()
  const [activeState, setActiveState] = useState(active)
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * SONG_HEIGHT);

  const { mutateAsync: updateOrderFn } = useMutation({
    mutationFn: updateOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] })
    }
  })

  const apiCall = async (homeComponents: string[]) => {
    try {
      await updateOrderFn({ homeComponents })
    } catch (error) {
      console.error('Erro ao chamar API:', error);
    }
  };

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * SONG_HEIGHT);
        }
      }
    },
    [moving]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(
          Haptics.ImpactFeedbackStyle.Medium
        );
      }
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        // Scroll down
        const contentHeight = songsCount * SONG_HEIGHT;
        const containerHeight =
          dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - SONG_HEIGHT, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionY / SONG_HEIGHT),
        0,
        songsCount - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );

        if (Platform.OS === 'ios') {
          runOnJS(Haptics.impactAsync)(
            Haptics.ImpactFeedbackStyle.Light
          );
        }
      }
    },
    onFinish() {
      const sortedKeys = Object.keys(positions.value).sort((a, b) => positions.value[a] - positions.value[b]);
      top.value = positions.value[id] * SONG_HEIGHT;
      runOnJS(setMoving)(false);
      runOnJS(apiCall)(sortedKeys)
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={moving ? 100 : 0} tint="light">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ maxWidth: '90%' }}>
            <Song 
              id={id}
              title={title} 
              active={activeState} 
              setActive={setActiveState} 
            />
          </Animated.View>
        </PanGestureHandler>
      </BlurView>
    </Animated.View>
  );
}

type SongListProps = {
  components: {
    id: string
    label: string
    active: boolean
  }[]
}

export function SongList({ components }: SongListProps) {
  const positions = useSharedValue(listToObject(components));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false)
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: 'white',
          }}
          contentContainerStyle={{
            height: components.length * SONG_HEIGHT,
          }}
        >
          {components.map((component) => (
            <MovableSong
              key={component.id}
              id={component.id}
              title={component.label}
              active={component.active}
              positions={positions}
              scrollY={scrollY}
              songsCount={components.length}
            />
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}