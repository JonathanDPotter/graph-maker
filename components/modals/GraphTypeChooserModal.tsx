import { Modal, ScaledSize, View } from "react-native";
import React, { Dispatch, FC, SetStateAction } from "react";
import GraphType from "../../enums/graphType";
import tw from "twrnc";
import { theme } from "../../colors.json";
import Button from "../shared/Button/Button";
import Text from "../shared/Text/Text";
import { backModalStyles, foreModalStyles } from "./modalStyles";

interface Iprops {
  setGraphType: Dispatch<SetStateAction<GraphType>>;
  setGtModalOpen: Dispatch<SetStateAction<boolean>>;
  gtModalOpen: boolean;
  graphType: GraphType;
  dims: ScaledSize;
}

const GraphTypeChooserModal: FC<Iprops> = ({
  setGraphType,
  setGtModalOpen,
  gtModalOpen,
  graphType,
  dims,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={gtModalOpen}
      onRequestClose={() => setGtModalOpen(false)}
    >
      <View style={tw`${backModalStyles}`}>
        <View
          style={tw`${foreModalStyles} items-center h-[${
            dims.height * 0.8
          }px] w-[${dims.width * 0.8}px]`}
        >
          <Text style={tw`text-[2rem]`}>Current Type: {graphType}</Text>
          <Button title="Bar" onPress={() => setGraphType(GraphType.bar)} />
          <Button title="Pie" onPress={() => setGraphType(GraphType.pie)} />
          <Button title="Line" onPress={() => setGraphType(GraphType.line)} />
          <Button title="Done" onPress={() => setGtModalOpen(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default GraphTypeChooserModal;
