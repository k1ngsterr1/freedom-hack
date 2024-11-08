import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type FontWeight =
  | "regular"
  | "bold"
  | "extraBold"
  | "italic"
  | "light"
  | "medium"
  | "semiBold"
  | "boldItalic"
  | "extraBoldItalic"
  | "lightItalic"
  | "mediumItalic"
  | "semiBoldItalic";

interface CustomTextProps extends RNTextProps {
  weight?: FontWeight;
}

const fontFamilyMap: Record<FontWeight, string> = {
  regular: "SF-Pro-Display-Regular",
  bold: "SF-Pro-Display-Bold",
  extraBold: "SF-Pro-Display-Heavy",
  italic: "SF-Pro-Display-RegularItalic",
  light: "SF-Pro-Display-Light",
  medium: "SF-Pro-Display-Medium",
  semiBold: "SF-Pro-Display-Semibold",
  boldItalic: "SF-Pro-Display-BoldItalic",
  extraBoldItalic: "SF-Pro-Display-BlackItalic",
  lightItalic: "SF-Pro-Display-LightItalic",
  mediumItalic: "SF-Pro-Display-MediumItalic",
  semiBoldItalic: "SF-Pro-Display-SemiboldItalic",
};

const Text: React.FC<CustomTextProps> = ({
  style,
  weight = "regular",
  ...props
}) => {
  const fontFamily = fontFamilyMap[weight];

  return <RNText style={[{ fontFamily }, style]} {...props} />;
};

export default Text;
