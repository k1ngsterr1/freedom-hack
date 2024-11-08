import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { useOpenCloseStore } from "src/entites/FilterTab/model/filter-tab-store";

interface FilterOption {
  id: string;
  label: string;
}

interface FiltersTabsProps {
  options: FilterOption[];
  onFilterChange: (selectedFilters: string[]) => void;
}

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 50;

export const FiltersTabs: React.FC<FiltersTabsProps> = ({
  options,
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const isOpen = useOpenCloseStore((state) => state.isOpen);
  const toggleOpenClose = useOpenCloseStore((state) => state.toggleOpenClose);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      translateY.value = withSpring(height, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isOpen]);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + Math.max(0, event.translationY);
    },
    onEnd: (event) => {
      if (event.translationY > SWIPE_THRESHOLD) {
        translateY.value = withSpring(height);
        runOnJS(toggleOpenClose)();
      } else {
        translateY.value = withSpring(0);
      }
    },
  });

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId];
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[{ width }, animatedStyle]}
        className="absolute bottom-0 bg-background rounded-t-3xl shadow-lg"
      >
        <View className="p-4 border-b border-gray-200">
          <View className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
          <Text className="text-text text-lg font-bold">Фильтры</Text>
        </View>
        <ScrollView className="p-4 max-h-80">
          {options.map((option) => (
            <MyTouchableOpacity
              key={option.id}
              onPress={() => toggleFilter(option.id)}
              className={`mb-2 px-4 py-3 rounded-xl ${
                selectedFilters.includes(option.id)
                  ? "bg-primary"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-base ${
                  selectedFilters.includes(option.id)
                    ? "text-white"
                    : "text-text"
                }`}
                weight={selectedFilters.includes(option.id) ? "bold" : "medium"}
              >
                {option.label}
              </Text>
            </MyTouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </PanGestureHandler>
  );
};
