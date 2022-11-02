import { FlatList, Modal, Pressable, ScaledSize, View } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import tw from "twrnc";
import { theme, themeArray, user } from "../../colors.json";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";
import { backModalStyles, foreModalStyles } from "./modalStyles";

interface Iprops {
  palette: string[];
  setPalette: Dispatch<SetStateAction<string[]>>;
  pModalOpen: boolean;
  setPModalOpen: Dispatch<SetStateAction<boolean>>;
  dims: ScaledSize;
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
}

const PaletteChooserModal: FC<Iprops> = ({
  palette,
  setPalette,
  pModalOpen,
  setPModalOpen,
  dims,
  background,
  setBackground,
}) => {
  const previewStyles = "h-6 w-6 my-1";

  const Pallete: FC<{ paletteInput: string[] }> = ({ paletteInput }) => (
    <FlatList
      horizontal
      data={paletteInput}
      renderItem={({ item }) => (
        <View style={tw`${previewStyles} bg-[${item}]`}></View>
      )}
    />
  );

  return (
    <Modal
      transparent
      animationType="slide"
      visible={pModalOpen}
      onRequestClose={() => setPModalOpen(false)}
    >
      <View style={tw`${backModalStyles}`}>
        <View
          style={tw`${foreModalStyles} items-center h-[${
            dims.height * 0.8
          }px] w-[${dims.width * 0.8}px]`}
        >
          <Text style={tw`text-2xl`}>Current:</Text>
          <View
            style={tw`h-12 border-solid p-2 border-2 border-[${theme.red}] justify-center bg-[${background}] mb-4`}
          >
            <Pallete paletteInput={palette} />
          </View>
          <Text style={tw`text-2xl`}>Background: </Text>
          {themeArray && (
            <FlatList
              horizontal
              data={themeArray}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setBackground(item)}
                  style={tw`flex-row bg-[${item}] h-6 w-6 my-1`}
                ></Pressable>
              )}
            />
          )}
          <Text style={tw`text-2xl`}>Bars:</Text>
          {user && (
            <FlatList
              data={user}
              keyExtractor={(item) => item[0]}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setPalette(item)}
                  style={tw`flex-row`}
                >
                  <Pallete paletteInput={item} />
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
