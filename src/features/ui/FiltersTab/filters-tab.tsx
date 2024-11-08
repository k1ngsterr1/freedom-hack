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
  interpolate,
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
  onFilterChange: (
    selectedFilters: string[],
    salaryRange: { min: number; max: number }
  ) => void;
}

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 50;
const SLIDER_WIDTH = width - 32;
const THUMB_SIZE = 24;
const MIN_SALARY = 0;
const MAX_SALARY = 200000;

const Thumb: React.FC<{ position: Animated.SharedValue<number> }> = ({
  position,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: THUMB_SIZE / 2,
          backgroundColor: "#4FB84F",
          position: "absolute",
          top: -THUMB_SIZE / 2 + 2,
        },
        animatedStyle,
      ]}
    />
  );
};

export const FiltersTabs: React.FC<FiltersTabsProps> = ({
  options,
  onFilterChange,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState({
    min: MIN_SALARY,
    max: MAX_SALARY,
  });
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const leftThumbPosition = useSharedValue(0);
  const rightThumbPosition = useSharedValue(SLIDER_WIDTH);

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
      onFilterChange(newFilters, salaryRange);
      return newFilters;
    });
  };

  const updateSalaryRange = (left: number, right: number) => {
    const newMin = Math.round(
      (left / SLIDER_WIDTH) * (MAX_SALARY - MIN_SALARY) + MIN_SALARY
    );
    const newMax = Math.round(
      (right / SLIDER_WIDTH) * (MAX_SALARY - MIN_SALARY) + MIN_SALARY
    );
    setSalaryRange({ min: newMin, max: newMax });
    onFilterChange(selectedFilters, { min: newMin, max: newMax });
  };

  const leftThumbHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = leftThumbPosition.value;
    },
    onActive: (event, ctx) => {
      const newPosition = ctx.startX + event.translationX;
      leftThumbPosition.value = Math.max(
        0,
        Math.min(newPosition, rightThumbPosition.value - THUMB_SIZE)
      );
      runOnJS(updateSalaryRange)(
        leftThumbPosition.value,
        rightThumbPosition.value
      );
    },
  });

  const rightThumbHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = rightThumbPosition.value;
    },
    onActive: (event, ctx) => {
      const newPosition = ctx.startX + event.translationX;
      rightThumbPosition.value = Math.min(
        SLIDER_WIDTH,
        Math.max(newPosition, leftThumbPosition.value + THUMB_SIZE)
      );
      runOnJS(updateSalaryRange)(
        leftThumbPosition.value,
        rightThumbPosition.value
      );
    },
  });

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
          <View className="mb-6">
            <Text className="text-text text-base font-semibold mb-2">
              Диапазон зарплаты
            </Text>
            <View className="h-1 bg-gray-200 rounded-full">
              <Animated.View
                className="h-1 bg-primary rounded-full"
                style={[
                  { left: leftThumbPosition.value },
                  {
                    width: interpolate(
                      rightThumbPosition.value - leftThumbPosition.value,
                      [0, SLIDER_WIDTH],
                      [0, SLIDER_WIDTH]
                    ),
                  },
                ]}
              />
            </View>
            <PanGestureHandler onGestureEvent={leftThumbHandler}>
              <Animated.View>
                <Thumb position={leftThumbPosition} />
              </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler onGestureEvent={rightThumbHandler}>
              <Animated.View>
                <Thumb position={rightThumbPosition} />
              </Animated.View>
            </PanGestureHandler>
            <View className="flex-row justify-between mt-4">
              <Text className="text-text text-sm">{salaryRange.min} ₽</Text>
              <Text className="text-text text-sm">{salaryRange.max} ₽</Text>
            </View>
          </View>
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
