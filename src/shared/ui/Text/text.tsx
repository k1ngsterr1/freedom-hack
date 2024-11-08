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

const openSansFontFamilyMap: Record<FontWeight, string> = {
  regular: "OpenSans-Regular",
  bold: "OpenSans-Bold",
  extraBold: "OpenSans-ExtraBold",
  italic: "OpenSans-Italic",
  light: "OpenSans-Light",
  medium: "OpenSans-Medium",
  semiBold: "OpenSans-SemiBold",
  boldItalic: "OpenSans-BoldItalic",
  extraBoldItalic: "OpenSans-ExtraBoldItalic",
  lightItalic: "OpenSans-LightItalic",
  mediumItalic: "OpenSans-MediumItalic",
  semiBoldItalic: "OpenSans-SemiBoldItalic",
};

const Text: React.FC<CustomTextProps> = ({
  style,
  weight = "regular",
  ...props
}) => {
  const fontFamily = openSansFontFamilyMap[weight];

  return <RNText style={[{ fontFamily }, style]} {...props} />;
};

export default Text;
