import React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const AnimatedIcon = Animated.createAnimatedComponent(Feather);

interface NavigationButtonProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  page: string;
  screen: string;
  isActive: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  iconName,
  page,
  screen,
  isActive,
}) => {
  const navigation = useNavigation();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value, { stiffness: 300, damping: 20 }) },
      ],
    };
  });

  const handlePress = () => {
    navigation.navigate(screen as never);
    scale.value = withSpring(1.2, { stiffness: 300, damping: 20 }, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="items-center justify-center"
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${screen}`}
      accessibilityState={{ selected: isActive }}
    >
      <Animated.View style={animatedStyle}>
        <AnimatedIcon
          name={iconName}
          size={24}
          color={isActive ? "#4FB84F" : "#045433"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export const BottomTab: React.FC = () => {
  const [activePage, setActivePage] = React.useState("home");
  const translateY = useSharedValue(0);

  const tabAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(translateY.value, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  React.useEffect(() => {
    translateY.value = withSpring(-10, { damping: 15, stiffness: 150 }, () => {
      translateY.value = withSpring(0);
    });
  }, [activePage]);

  return (
    <Animated.View
      style={[
        tabAnimation,
        {
          position: "absolute",
          bottom: Platform.OS === "android" ? 16 : 0,
          width: "100%",
          alignSelf: "center",
          backgroundColor: "#f8f8f8",
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderRadius: 24,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 8,
        },
      ]}
    >
      <NavigationButton
        iconName="home"
        page="home"
        screen="Home"
        isActive={activePage === "home"}
      />
      <NavigationButton
        iconName="search"
        page="love"
        screen="Quiz"
        isActive={activePage === "love"}
      />
      <NavigationButton
        iconName="file-text"
        page="games"
        screen="Games"
        isActive={activePage === "games"}
      />
      <NavigationButton
        iconName="settings"
        page="settings"
        screen="Settings"
        isActive={activePage === "settings"}
      />
    </Animated.View>
  );
};
