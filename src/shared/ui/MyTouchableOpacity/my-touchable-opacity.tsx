import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface MyTouchableOpacityProps extends TouchableOpacityProps {}

const MyTouchableOpacity: FC<MyTouchableOpacityProps> = ({
  children,
  ...rest
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default MyTouchableOpacity;
