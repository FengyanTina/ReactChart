import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset, valueFormatter } from "../data";
import { HighlightItemData, HighlightScope } from "@mui/x-charts";
import {
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
const barChartsParams = {
  series: [
    {
      data: [30, 40, 10, 60, 50, 10, 60, 50, 30, 40, 10, 30],
      label: "Ekonomi",
    },
    {
      data: [30, 20, 30, 40, 10, 10, 50, 50, 30, 30, 20, 20],
      label: "Arbetsgivaransvar",
    },
    {
      data: [30, 20, 30, 40, 10, 10, 50, 50, 30, 30, 20, 20],
      label: "Ledning och uppföljning",
    },
    {
      data: [30, 20, 30, 40, 10, 10, 50, 50, 30, 30, 20, 20],
      label: "Arbetsmiljö",
    },
    {
      data: [30, 20, 30, 40, 10, 10, 50, 50, 30, 30, 20, 20],
      label: "Styrelsen",
    },
  ],
  height: 400,
};
const chartSetting = {
  yAxis: [
    {
      label: "Arbetstimme (timmar)",
    },
  ],

  width: 700,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function BarsDataset() {
  const [highlightedItem, setHighLightedItem] =
    React.useState<HighlightItemData | null>(null);
  const [highlighted, setHighlighted] = React.useState("item");

  return (
    <>
      <Stack
        direction={{ xs: "row", xl: "column" }}
        spacing={3}
        justifyContent="center"
        flexWrap="wrap"
        useFlexGap
      >
        <TextField
          select
          label="highlighted"
          value={highlighted}
          onChange={(event) => setHighlighted(event.target.value)}
          sx={{
            fontSize: "0.8rem",
            minWidth: 100,
            height: 30, // Reduce height here
            "& .MuiInputBase-root": {
              height: 50, // Ensure input field height is also adjusted
              border: "none", // Remove the border
              boxShadow: "none",
            },
            "& .MuiInputLabel-root": {
              top: "5px", // Adjust label position to stay within bounds
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove the outlined border
            },
            "& .MuiSelect-select": {
              padding: "5 12px", // Adjust padding inside the select dropdown
            },
            "& .MuiInputBase-input": {
              fontSize: "0.8rem", // Change the input font size (default text or placeholder text)
            },
          }}
        >
          <MenuItem sx={{ fontSize: "0.8rem" }} value={"none"}>
            none
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.8rem" }} value={"item"}>
            item
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.8rem" }} value={"series"}>
            series
          </MenuItem>
        </TextField>
        {/* <TextField
          select
          label="faded"
          value={faded}
          onChange={(event) => setFaded(event.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value={'none'}>none</MenuItem>
          <MenuItem value={'series'}>series</MenuItem>
          <MenuItem value={'global'}>global</MenuItem>
        </TextField> */}
      </Stack>

      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        margin={{ top: 60, right: 200, bottom: 80, left: 100 }}
        //   series={[
        //     { dataKey: 'Ekonomi', label: 'Ekonomi' },
        //     { dataKey: 'Arbetsgivaransvar', label: 'Arbetsgivaransvar' },
        //     { dataKey: 'lU', label: 'Ledning och uppföljning' },
        //     { dataKey: 'Arbetsmiljö', label: 'Arbetsmiljö' },
        //     { dataKey: 'Styrelsen', label: 'Styrelsen' },

        //   ]}
        {...barChartsParams}
        series={barChartsParams.series.map((series) => ({
          ...series,
          highlightScope: {
            highlighted,
          } as HighlightScope,
        }))}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 12,
            },
            direction: "column",
            position: {
              vertical: "middle",
              horizontal: "right",
            },

            itemMarkWidth: 20,
            itemMarkHeight: 4,
            markGap: 5,
            itemGap: 10,
          },
        }}
        {...chartSetting}
        highlightedItem={highlightedItem}
        onHighlightChange={setHighLightedItem}
      />
    </>
  );
}
