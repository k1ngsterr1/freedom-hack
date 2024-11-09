import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Layout } from "@app/layouts/layout";
import Text from "@shared/ui/Text/text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const CIRCLE_LENGTH = 1000;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);

export const EnhancedLoadingScreen: React.FC = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      -1,
      true
    );
    scale.value = withRepeat(
      withSequence(
        withSpring(1.2, { stiffness: 100, damping: 10 }),
        withSpring(1, { stiffness: 100, damping: 10 })
      ),
      -1,
      true
    );
  }, []);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(scale.value, [1, 1.2], [0.5, 1]),
  }));

  return (
    <Layout>
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Animated.View
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
          className="items-center"
        >
          <Animated.View
            style={[
              circleAnimatedStyle,
              { width: CIRCLE_RADIUS * 2, height: CIRCLE_RADIUS * 2 },
            ]}
          >
            <Svg width={CIRCLE_RADIUS * 2} height={CIRCLE_RADIUS * 2}>
              <Circle
                cx={CIRCLE_RADIUS}
                cy={CIRCLE_RADIUS}
                r={CIRCLE_RADIUS - 10}
                stroke="#045433"
                strokeWidth={15}
                strokeLinecap="round"
                strokeDasharray={CIRCLE_LENGTH}
                strokeDashoffset={CIRCLE_LENGTH * 0.75}
              />
            </Svg>
          </Animated.View>

          <Animated.View style={textAnimatedStyle} className="absolute">
            <Text className="text-4xl font-bold text-primary">v0</Text>
          </Animated.View>

          <Animated.Text
            className="text-2xl font-semibold text-gray-700 mt-12 mb-2"
            entering={FadeIn.delay(500).duration(1000)}
          >
            Loading
          </Animated.Text>
          <Animated.Text
            className="text-lg text-gray-600 mb-8"
            entering={FadeIn.delay(1000).duration(1000)}
          >
            Preparing your AI experience...
          </Animated.Text>
        </Animated.View>

        <View className="absolute bottom-12 left-0 right-0 items-center">
          <View className="bg-white rounded-full p-1 w-3/4 shadow-lg overflow-hidden">
            <Animated.View
              className="h-2 bg-primary rounded-full"
              style={{
                width: withRepeat(
                  withTiming("100%", {
                    duration: 2000,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                  }),
                  -1,
                  true
                ),
              }}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};
