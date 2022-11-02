import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import tw from "twrnc";
import { G, Line, Rect, Svg } from "react-native-svg";
// components
import Screen from "../../shared/Screen/Screen";
import Button from "../../shared/Button/Button";
import GraphType from "../../../enums/graphType";
import GraphTypeChooserModal from "../../modals/GraphTypeChooserModal";
import PaletteChooserModal from "../../modals/PaletteChooserModal";
import EditDataModal from "../../modals/EditDataModal";
// utilities
import Idata from "../../../interfaces/data";
import { theme, user } from "../../../colors.json";
import { max, scaleBand, scaleLinear } from "d3";
import Bar from "../../graphs/Bar";

const Home = () => {
  const [dims, setDims] = useState(Dimensions.get("window"));
  const [graphType, setGraphType] = useState<GraphType>(GraphType.bar);
  const [gtModalOpen, setGtModalOpen] = useState(false);
  const [palette, setPalette] = useState<string[]>(user[0]);
  const [pModalOpen, setPModalOpen] = useState(false);
  const [data, setData] = useState<Idata[]>([{ name: "", units: null }]);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [background, setBackground] = useState(theme.black);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.units)! + 10])
    .range([dims.width * 0.9, 0]);

  const x = scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, dims.width * 0.9])
    .padding(0.1);

  useEffect(() => {
    setDims(Dimensions.get("window"));
  }, [Dimensions]);

  return (
    <Screen style={tw`items-center`}>
      <Svg
        height={dims.width * 0.9}
        width={dims.width * 0.9}
        style={tw`rounded-lg mt-8 bg-[${background}]`}
      >
        {graphType === GraphType.bar && (
          <Bar {...{ dims, data, x, y, palette }} />
        )}
      </Svg>
      <View style={tw`flex-1 py-4 w-[100%] items-center justify-around`}>
        <Button
          title="Edit Data"
          onPress={() => setDataModalOpen(true)}
          style={tw`w-[75%]`}
        />
        <Button
          title="Choose Palette"
          onPress={() => setPModalOpen(true)}
          style={tw`w-[75%]`}
        />
        <Button
          title="Choose Graph Type"
          onPress={() => setGtModalOpen(true)}
          style={tw`w-[75%]`}
        />
      </View>
      <EditDataModal
        {...{ setData, setDataModalOpen, dataModalOpen, data, dims }}
      />
      <PaletteChooserModal
        {...{
          palette,
          setPalette,
          pModalOpen,
          setPModalOpen,
          background,
          setBackground,
          dims,
        }}
      />
      <GraphTypeChooserModal
        {...{ setGraphType, setGtModalOpen, gtModalOpen, graphType, dims }}
      />
    </Screen>
  );
};

export default Home;
