import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import tw from "twrnc";
import { Rect, Svg } from "react-native-svg";
// components
import Screen from "../../shared/Screen/Screen";
import Button from "../../shared/Button/Button";
import GraphType from "../../../enums/graphType";
import GraphTypeChooserModal from "../../modals/GraphTypeChooserModal";
import PaletteChooserModal from "../../modals/PaletteChooserModal";
import AddDataModal from "../../modals/AddDataModal";
// utilities
import Idata from "../../../interfaces/data";
import { theme, user } from "../../../colors.json";

const Home = () => {
  const [dims, setDims] = useState(Dimensions.get("window"));
  const [graphType, setGraphType] = useState<GraphType>(GraphType.bar);
  const [gtModalOpen, setGtModalOpen] = useState(false);
  const [palette, setPalette] = useState<string[]>(user[0]);
  const [pModalOpen, setPModalOpen] = useState(false);
  const [data, setData] = useState<Idata[]>(
    new Array(10).fill({ name: "", units: 0 })
  );
  const [dataModalOpen, setDataModalOpen] = useState(false);

  useEffect(() => {
    setDims(Dimensions.get("window"));
  }, [Dimensions]);

  return (
    <Screen style={tw`items-center`}>
      <Svg
        height={dims.width * 0.9}
        width={dims.width * 0.9}
        style={tw`border-solid border-8 border-[${theme.redOrange}] rounded-lg mt-8 bg-[${theme.champagne}]`}
      ></Svg>
      <View style={tw`flex-1 py-4 w-[100%] items-center justify-around`}>
        <Button title="Add Data" onPress={() => setDataModalOpen(true)} />
        <Button title="Choose Palette" onPress={() => setPModalOpen(true)} />
        <Button
          title="Choose Graph Type"
          onPress={() => setGtModalOpen(true)}
        />
      </View>
      <GraphTypeChooserModal
        {...{ setGraphType, setGtModalOpen, gtModalOpen, graphType }}
      />
      <PaletteChooserModal
        {...{ palette, setPalette, pModalOpen, setPModalOpen }}
      />
      <AddDataModal {...{ setData, setDataModalOpen, dataModalOpen, data }} />
    </Screen>
  );
};

export default Home;
