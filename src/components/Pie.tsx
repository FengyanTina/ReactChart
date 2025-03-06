import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  PieItemIdentifier,
  DefaultizedPieValueType,
} from "@mui/x-charts/models";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { HighlightItemData, legendClasses, pieArcLabelClasses, PieChartProps } from "@mui/x-charts";
const otherProps: Partial<PieChartProps> = {
    width: 400,
    height: 200,
    sx: {
      [`.${legendClasses.root}`]: {
        transform: 'translate(60px, 0)',
      },
    },
  };
const items = [
  { id: "id_A", value: 45, label: "Ekonomi" },
  { id: "id_B", value: 60, label: "Arbetsgivaransvar" },
  { id: "id_C", value: 40, label: "Ledning och uppföljning" },
  { id: "id_D", value: 50, label: "Arbetsmiljö" },
  { id: "id_E", value: 30, label: "Styrelsen" },
];

const formatObject = (obj: null | PieItemIdentifier) => {
  if (obj === null) {
    return "  undefined";
  }
  return JSON.stringify(obj, null, 2)
    .split("\n")
    .map((l) => `  ${l}`)
    .join("\n");
};
export default function OnSeriesItemClick() {
  const [identifier, setIdentifier] = React.useState<null | PieItemIdentifier>(
    null
  );
  const [id, setId] = React.useState<undefined | string | number>(undefined);

  const handleClick = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    itemIdentifier: PieItemIdentifier,
    item: DefaultizedPieValueType
  ) => {
    setId(item.id);
    setIdentifier(itemIdentifier);
  };
  const TOTAL = items.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
const [highlightedItem, setHighLightedItem] = React.useState<HighlightItemData | null>(null);


  
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      sx={{ width: "100%" }}
    >
      <Typography
        component="pre"
        sx={{
          maxWidth: { xs: "100%", md: "50%", flexShrink: 1 },
          overflow: "auto",
        }}
      >
        
      </Typography>

      <PieChart
     
        series={[
          {
            data: items.map((item) => ({
              ...item,
              label: `${item.label} (${item.value} )`,
              
            })),
            outerRadius: 80,
            arcLabel: getArcLabel,
            arcLabelMinAngle: 25,
            arcLabelRadius: '60%',
            highlightScope: { highlight: "item", fade: "global" },
            valueFormatter: (v, { dataIndex }) => {
                const percent = (v.value / TOTAL) * 100;
                return `${items[dataIndex].label} jobbar ${v.value} timmar och utgör ${percent.toFixed(0)}% av det totala.`;
              },
          },
        ]}
       
        slotProps={{
         
            legend: {
                labelStyle: {
            fontSize: 12,
           
          },
            direction: 'column',
            position: {
                vertical: 'middle',
                horizontal: 'right',
            },
        
            itemMarkWidth: 20,
            itemMarkHeight: 10,
            markGap: 5,
            itemGap: 10,
          }, }}
        onItemClick={handleClick}
        width={550}
        height={200}
        //margin={{ right: 100 }}// push the pie futher to the left
        highlightedItem={highlightedItem}
        onHighlightChange={setHighLightedItem}
        {...otherProps}
      />
    </Stack>
  );
}
