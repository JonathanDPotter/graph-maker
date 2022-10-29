import { View, ViewStyle } from "react-native";
import tw from "twrnc";
import { theme } from "../../../colors.json";
import React, { FC, ReactNode } from "react";

interface Iprops {
  style?: ViewStyle;
  children: ReactNode;
}

const Screen: FC<Iprops> = ({ style, children }) => {
  return (
    <View style={[tw`flex-1 bg-[${theme.sapphire}]`, style]}>{children}</View>
  );
};

export default Screen;
