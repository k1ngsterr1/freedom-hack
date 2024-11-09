import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useVacancyStore } from "src/entites/FilterTab/model/filter-tab-store";
import { useVacancyFilterStore } from "src/entites/VacancyFilterTab/model/use-vacancy-filter-store";

const { height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 50;

export const VacancyFilterPanel = () => {
  const {
    experienceFilter,
    setExperienceFilter,
    sortBy,
    setSortBy,
    dateFilter,
    setDateFilter,
    applyFilters,
  } = useVacancyFilterStore();
  const isOpen = useVacancyStore((state) => state.isOpen);
  const toggleOpenClose = useVacancyStore((state) => state.toggleOpenClose);

  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    if (isOpen) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(height, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(0, { duration: 300 });
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

  const renderSortButton = (option: string, label: string) => (
    <MyTouchableOpacity
      onPress={() => setSortBy(option)}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
        backgroundColor: sortBy === option ? "#4FB84F" : "#E5E7EB",
      }}
    >
      <Text style={{ color: sortBy === option ? "white" : "#6B7280" }}>
        {label}
      </Text>
    </MyTouchableOpacity>
  );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          animatedStyle,
        ]}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View
            style={{
              width: 48,
              height: 4,
              backgroundColor: "#D1D5DB",
              borderRadius: 2,
            }}
          />
        </View>

        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
          Фильтры
        </Text>

        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          Опыт работы:
        </Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
        >
          {["all", "1+", "3+", "5+"].map((option) => (
            <MyTouchableOpacity
              key={option}
              onPress={() => setExperienceFilter(option)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                marginRight: 8,
                marginBottom: 8,
                backgroundColor:
                  experienceFilter === option ? "#4FB84F" : "#E5E7EB",
              }}
            >
              <Text
                style={{
                  color: experienceFilter === option ? "white" : "#6B7280",
                }}
              >
                {option === "all" ? "Все" : `От ${option} лет`}
              </Text>
            </MyTouchableOpacity>
          ))}
        </View>

        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Сортировка:</Text>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
        >
          {renderSortButton("newest", "Новые")}
          {renderSortButton("oldest", "Старые")}
        </View>

        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
          Дата публикации:
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        >
          {[
            { value: "all", label: "Все время" },
            { value: "week", label: "За неделю" },
            { value: "month", label: "За месяц" },
            { value: "3months", label: "За 3 месяца" },
            { value: "6months", label: "За 6 месяцев" },
            { value: "year", label: "За год" },
          ].map((option) => (
            <MyTouchableOpacity
              key={option.value}
              onPress={() => setDateFilter(option.value)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                marginRight: 8,
                backgroundColor:
                  dateFilter === option.value ? "#4FB84F" : "#E5E7EB",
              }}
            >
              <Text
                style={{
                  color: dateFilter === option.value ? "white" : "#6B7280",
                }}
              >
                {option.label}
              </Text>
            </MyTouchableOpacity>
          ))}
        </ScrollView>

        <MyTouchableOpacity
          className="mb-6"
          onPress={() => {
            applyFilters();
            runOnJS(toggleOpenClose)();
          }}
          style={{
            backgroundColor: "#4FB84F",
            borderRadius: 8,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Применить фильтры
          </Text>
        </MyTouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};
