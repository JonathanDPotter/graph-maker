import { Modal, View } from "react-native";
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
}

const GraphTypeChooserModal: FC<Iprops> = ({
  setGraphType,
  setGtModalOpen,
  gtModalOpen,
  graphType,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={gtModalOpen}
      onRequestClose={() => setGtModalOpen(false)}
    >
      <View style={tw`${backModalStyles}`}>
        <View style={tw`${foreModalStyles}`}>
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
