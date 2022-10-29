import { FlatList, Modal, TextInput, View } from "react-native";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import tw from "twrnc";
import { theme } from "../../colors.json";
import { backModalStyles, foreModalStyles } from "./modalStyles";
import Idata from "../../interfaces/data";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";

interface Iprops {
  setData: Dispatch<SetStateAction<Idata[]>>;
  data: Idata[];
  dataModalOpen: boolean;
  setDataModalOpen: Dispatch<SetStateAction<boolean>>;
}

const GraphTypeChooserModal: FC<Iprops> = ({
  setData,
  setDataModalOpen,
  dataModalOpen,
  data,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={dataModalOpen}
      onRequestClose={() => setDataModalOpen(false)}
    >
      <View style={tw`${backModalStyles}`}>
        <View style={tw`${foreModalStyles}`}>
          <Button
            title="Add Data Point"
            onPress={() => setData([...data, { name: "", units: null }])}
          />
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.name + index + "data-form"}
            renderItem={({ item, index }) => (
              <View style={tw`flex-row `}>
                <Text>Name: </Text>
                <TextInput
                  value={data[index].name}
                  onChangeText={(value) =>
                    setData((prev) => [
                      ...prev.slice(0, index),
                      { ...prev[index], name: value },
                      ...prev.slice(index + 1),
                    ])
                  }
                />
                <Text>Units: </Text>
                <TextInput
                  keyboardType="numeric"
                  value={data[index].units?.toString()}
                  onChangeText={(value) =>
                    setData((prev) => [
                      ...prev.slice(0, index),
                      {
                        ...prev[index],
                        units: value ? parseFloat(value) : null,
                      },
                      ...prev.slice(index + 1),
                    ])
                  }
                />
              </View>
            )}
          />
          <Button title="Done" onPress={() => setDataModalOpen(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default GraphTypeChooserModal;
