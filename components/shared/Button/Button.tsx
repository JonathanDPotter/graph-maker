import { Pressable, TextStyle, ViewStyle } from "react-native";
import React, { FC } from "react";
import tw from "twrnc";
import Text from "../Text/Text";
import { theme } from "../../../colors.json";

interface Iprops {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: any;
}

const Button: FC<Iprops> = ({ title, style, textStyle, onPress }) => {
  return (
    <Pressable
      style={[
        tw`px-4 py-2 m-2 items-center border-[${theme.orange}] bg-[${theme.red}] border-2 rounded`,
        style,
      ]}
      onPress={onPress}
      android_ripple={{ color: theme.sapphire }}
    >
      <Text style={[tw`text-lg`, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;
