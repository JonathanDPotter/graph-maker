import { TextStyle, Text as RNText } from "react-native";
import React, { FC, ReactNode } from "react";
import { useFonts } from "expo-font";
import tw from "twrnc";
import { theme } from "../../../colors.json";

interface Iprops {
  children?: ReactNode;
  style?: (TextStyle | undefined) | (TextStyle | undefined)[];
  onPress?: () => void;
}

const Text: FC<Iprops> = ({ children, style, onPress }) => {
  const [fontsLoaded] = useFonts({
    "VarelaRound-Regular": require("../../../assets/VarelaRound-Regular.ttf"),
  });
  return (
    <RNText
      onPress={onPress}
      style={[
        tw`text-[${theme.champagne}]`,
        style,
        fontsLoaded ? { fontFamily: "VarelaRound-Regular" } : null,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
