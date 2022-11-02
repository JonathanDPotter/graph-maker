import { View,  ViewStyle } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "twrnc";
// utils
import { theme } from "../../../colors.json";

interface Iprops {
  style?: ViewStyle;
  children: ReactNode;
}

const Screen: FC<Iprops> = ({ style, children }) => {
  return (
    <View
      style={[tw`flex-1 bg-[${theme.sapphire}]`, style]}
    >
      {children}
    </View>
  );
};

export default Screen;
