import { FlatList, Modal, Pressable, View } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import tw from "twrnc";
import { theme, user } from "../../colors.json";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";
import { backModalStyles, foreModalStyles } from "./modalStyles";

interface Iprops {
  palette: string[];
  setPalette: Dispatch<SetStateAction<string[]>>;
  pModalOpen: boolean;
  setPModalOpen: Dispatch<SetStateAction<boolean>>;
}

const PaletteChooserModal: FC<Iprops> = ({
  palette,
  setPalette,
  pModalOpen,
  setPModalOpen,
}) => {
  const previewStyles = "h-6 w-6 my-1";

  return (
    <Modal
      transparent
      animationType="slide"
      visible={pModalOpen}
      onRequestClose={() => setPModalOpen(false)}
    >
      <View style={tw`${backModalStyles}`}>
        <View style={tw`${foreModalStyles}`}>
          <Text style={tw`text-[2rem]`}>Current Palette:</Text>
          <View
            style={tw`flex-row border-solid p-2 border-2 border-[${theme.red}]`}
          >
            <View style={tw`${previewStyles} bg-[${palette[0]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[1]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[2]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[3]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[4]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[5]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[6]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[7]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[8]}]`}></View>
            <View style={tw`${previewStyles} bg-[${palette[9]}]`}></View>
          </View>
          {user && (
            <FlatList
              data={user}
              keyExtractor={(item) => item[0]}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setPalette(item)}
                  style={tw`flex-row`}
                >
                  <View style={tw`${previewStyles} bg-[${item[0]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[1]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[2]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[3]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[4]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[5]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[6]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[7]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[8]}]`}></View>
                  <View style={tw`${previewStyles} bg-[${item[9]}]`}></View>
                </Pressable>
              )}
            />
          )}
          <Button title="Done" onPress={() => setPModalOpen(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default PaletteChooserModal;
