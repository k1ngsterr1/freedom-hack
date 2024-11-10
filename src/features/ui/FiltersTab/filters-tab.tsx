import React, { useEffect } from "react";
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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useFilterStore } from "src/entites/VacancyFilter/use-vacancy-store";
import { useUserStackStore } from "src/entites/FilterTab/model/filter-tab-store";

interface FilterOption {
  id: string;
  label: string;
}

interface FiltersTabsProps {
  options: FilterOption[];
  onFilterApply: () => void;
}

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 50;
const MIN_SALARY = 0;
const MAX_SALARY = 1000000;

export const FiltersTabs: React.FC<FiltersTabsProps> = ({
  options,
  onFilterApply,
}) => {
  const {
    selectedFilters,
    salaryRange,
    sortOrder,
    setFilters,
    setSalaryRange,
    setSortOrder,
    resetFilters,
  } = useFilterStore();

  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const isOpen = useUserStackStore((state) => state.isOpen);
  const toggleOpenClose = useUserStackStore((state) => state.toggleOpenClose);

  useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      translateY.value = withSpring(height, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(0, {
        duration: 300,
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
    const updatedFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((id) => id !== filterId)
      : [...selectedFilters, filterId];
    setFilters(updatedFilters);
  };

  const updateSalaryRange = (values: string[]) => {
    setSalaryRange({ min: values[0], max: values[1] });
  };

  const handleSortOrder = (order: "from_new" | "from_old") => {
    setSortOrder(sortOrder === order ? null : order);
  };

  const applyFilters = () => {
    onFilterApply();
    runOnJS(toggleOpenClose)();
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[{ width }, animatedStyle]}
        className="absolute bottom-0 bg-background rounded-t-3xl shadow-lg"
      >
        <View className="p-4 border-b border-gray-200">
          <View className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
          <Text className="text-text text-2xl mt-2" weight="bold">
            Фильтры
          </Text>
        </View>
        <ScrollView className="p-4 pb-10">
          <View className="mb-6">
            <Text className="text-text text-lg font-semibold mb-2">
              Диапазон зарплаты:
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-text text-sm">{salaryRange.min} ₸</Text>
              <Text className="text-text text-sm">{salaryRange.max} ₸</Text>
            </View>
            <View className="mr-4">
              <MultiSlider
                values={[salaryRange.min, salaryRange.max]}
                sliderLength={width - 40}
                onValuesChange={updateSalaryRange}
                min={MIN_SALARY}
                max={MAX_SALARY}
                step={1000}
                allowOverlap={false}
                snapped
                selectedStyle={{ backgroundColor: "#4FB84F" }}
                unselectedStyle={{ backgroundColor: "#E5E7EB" }}
                containerStyle={{ height: 40 }}
                trackStyle={{ height: 4, backgroundColor: "#E5E7EB" }}
                markerStyle={{
                  height: 22,
                  width: 22,
                  backgroundColor: "#4FB84F",
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <View className="mb-6">
            <Text className="text-text text-lg font-semibold mb-2">
              Сортировка:
            </Text>
            <View className="flex-row ">
              <MyTouchableOpacity
                onPress={() => handleSortOrder("newest")}
                className={`px-4 py-2 rounded-xl ${
                  sortOrder === "newest" ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-base ${
                    sortOrder === "newest" ? "text-white" : "text-text"
                  }`}
                  weight={sortOrder === "newest" ? "bold" : "medium"}
                >
                  От новых
                </Text>
              </MyTouchableOpacity>

              <MyTouchableOpacity
                onPress={() => handleSortOrder("oldest")}
                className={`px-4 py-2 rounded-xl ml-2 ${
                  sortOrder === "oldest" ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-base ${
                    sortOrder === "oldest" ? "text-white" : "text-text"
                  }`}
                  weight={sortOrder === "oldest" ? "bold" : "medium"}
                >
                  От старых
                </Text>
              </MyTouchableOpacity>
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
          <View className="flex-row justify-between mb-6">
            <MyTouchableOpacity
              onPress={handleResetFilters}
              className="bg-gray-200 rounded-lg py-3 px-4 flex-1 mr-2"
            >
              <Text className="text-text text-base text-center font-semibold">
                Сбросить
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={applyFilters}
              className="bg-primary rounded-lg py-3 px-4 flex-1 ml-2"
            >
              <Text className="text-white text-base text-center font-semibold">
                Применить
              </Text>
            </MyTouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </PanGestureHandler>
  );
};
