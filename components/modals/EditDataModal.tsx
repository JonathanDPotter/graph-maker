import {
  FlatList,
  Modal,
  Pressable,
  ScaledSize,
  TextInput,
  View,
} from "react-native";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import tw from "twrnc";
// components
import Idata from "../../interfaces/data";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";
// styles
import {
  backModalStyles,
  dataInput,
  dataLabel,
  dataLabelInput,
  foreModalStyles,
} from "./modalStyles";
import { theme } from "../../colors.json";

interface Iprops {
  setData: Dispatch<SetStateAction<Idata[]>>;
  data: Idata[];
  dataModalOpen: boolean;
  setDataModalOpen: Dispatch<SetStateAction<boolean>>;
  dims: ScaledSize;
}

const AddDataModal: FC<Iprops> = ({
  setData,
  setDataModalOpen,
  dataModalOpen,
  data,
  dims,
}) => {
  const NameInput: FC<{ item: Idata; index: number }> = ({ item, index }) => {
    const [tempValue, setTempValue] = useState(item.name || "");

    return (
      <TextInput
        style={tw`${dataInput}`}
        value={tempValue}
        onChangeText={setTempValue}
        onEndEditing={() =>
          setData((prev) => [
            ...prev.slice(0, index),
            { ...prev[index], name: tempValue || "" },
            ...prev.slice(index + 1),
          ])
        }
      />
    );
  };

  const UnitsInput: FC<{ item: Idata; index: number }> = ({ item, index }) => {
    const [tempValue, setTempValue] = useState<string | null>(null);

    useEffect(() => {
      setTempValue(item.units ? item.units.toString() : null);
    }, []);

    return (
      <TextInput
        keyboardType="numeric"
        style={tw`${dataInput}`}
        value={tempValue?.toString() || ""}
        onChangeText={setTempValue}
        onEndEditing={() =>
          setData((prev) => [
            ...prev.slice(0, index),
            { ...prev[index], units: parseFloat(tempValue || "0") },
            ...prev.slice(index + 1),
          ])
        }
      />
    );
  };

  const addDataPoint = () => {
    data.length < 10 && setData((prev) => [...prev, { name: "", units: null }]);
  };

  const removeDataPoint = () => {
    setData((prev) => [...prev].slice(0, -1));
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={dataModalOpen}
      onRequestClose={() => setDataModalOpen(false)}
    >
      <View style={tw`${backModalStyles} justify-start`}>
        <View
          style={tw`${foreModalStyles} h-[${dims.height * 0.8}px] w-[${
            dims.width * 0.8
          }px]`}
        >
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.name + index + "data-form"}
            renderItem={({ item, index }) => (
              <View style={tw`${dataLabelInput}`}>
                <Text style={tw`${dataLabel}`}>Name: </Text>
                <NameInput {...{ item, index }} />
                <Text style={tw`${dataLabel}`}>Units: </Text>
                <UnitsInput {...{ item, index }} />
                <Pressable
                  onPress={removeDataPoint}
                  style={tw`bg-[${theme.orange}] w-6 h-6 rounded-xl items-center justify-center`}
                >
                  <Text style={tw`text-[${theme.red}]`}>X</Text>
                </Pressable>
              </View>
            )}
          />
          <Button title="Add Data Point" onPress={addDataPoint} />
          <Button title="Done" onPress={() => setDataModalOpen(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default AddDataModal;
