import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import MyTouchableOpacity from "@shared/ui/MyTouchableOpacity/my-touchable-opacity";
import Text from "@shared/ui/Text/text";
import { Feather } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.6;
const CARD_HEIGHT = 250;
const CARD_MARGIN = 8;

interface Vacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requirements: string[];
}

interface VacancyCardProps {
  vacancy: Vacancy;
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  index,
  scrollX,
}) => {
  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_MARGIN * 2),
    index * (CARD_WIDTH + CARD_MARGIN * 2),
    (index + 1) * (CARD_WIDTH + CARD_MARGIN * 2),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          marginHorizontal: CARD_MARGIN,
        },
        animatedStyle,
      ]}
      className="bg-white rounded-2xl shadow-md p-4 justify-between"
    >
      <View>
        <Text
          weight="bold"
          className="text-primary text-lg font-bold mb-2"
          numberOfLines={1}
        >
          {vacancy.title}
        </Text>
        <Text className="text-secondary text-sm font-semibold mb-2">
          {vacancy.company}
        </Text>
        <View className="flex-row items-center mb-1">
          <Feather name="map-pin" size={14} color="#045433" className="mr-2" />
          <Text className="text-text text-sm" numberOfLines={1}>
            {vacancy.location}
          </Text>
        </View>
        <Text className="text-text text-sm font-bold mb-2">
          <Text weight="bold">Зарплата:</Text> {vacancy.salary}
        </Text>
        <Text className="text-text text-sm" numberOfLines={2}>
          <Text weight="bold">Требования:</Text>{" "}
          {vacancy.requirements.join(", ")}
        </Text>
      </View>
      <MyTouchableOpacity
        className="bg-primary rounded-full py-2 px-4 self-start mt-2"
        onPress={() => console.log(`View details for vacancy: ${vacancy.id}`)}
      >
        <Text className="text-white text-sm font-bold">Подробнее</Text>
      </MyTouchableOpacity>
    </Animated.View>
  );
};

interface CompactHorizontalVacancySwiperProps {
  vacancies: Vacancy[];
}

export const CompactHorizontalVacancySwiper: React.FC<
  CompactHorizontalVacancySwiperProps
> = ({ vacancies }) => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View className="h-[270px]">
      <PanGestureHandler>
        <Animated.ScrollView
          horizontal
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: CARD_MARGIN }}
          className="flex-1"
        >
          {vacancies.map((vacancy, index) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              index={index}
              scrollX={scrollX}
            />
          ))}
        </Animated.ScrollView>
      </PanGestureHandler>
    </View>
  );
};
