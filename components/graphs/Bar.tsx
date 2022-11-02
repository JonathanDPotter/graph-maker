import { ScaledSize } from "react-native";
import React, { FC } from "react";
import Idata from "../../interfaces/data";
import { Rect } from "react-native-svg";
import { ScaleBand, ScaleLinear } from "d3";

interface Iprops {
  data: Idata[];
  dims: ScaledSize;
  x: ScaleBand<string>;
  y: ScaleLinear<number, number, never>;
  palette: string[];
}

const Bar: FC<Iprops> = ({ data, dims, x, y, palette }) => {
  return (
    <>
      {data &&
        data.map((item, index) => {
          const { name, units } = item;

          return name && units ? (
            <Rect
              width={x.bandwidth()}
              height={dims.height * 0.9 - y(units || 0)}
              x={x(name)}
              y={y(units || 0)}
              fill={palette[index]}
              key={name + index}
            />
          ) : null;
        })}
    </>
  );
};

export default Bar;
