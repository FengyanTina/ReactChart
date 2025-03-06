import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function MarginAndLabelPosition() {
  const [fixMargin, setFixMargin] = React.useState(true);
  const [fixLabel, setFixLabel] = React.useState(true);

  return (
    <Box sx={{ width: '50%' }}>
     

      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'code',
            // valueFormatter: (value, context) =>
            //   context.location === 'tick'
            //     ? value.split('').join('\n')
            //     : usAirportPassengers.find((item) => item.code === value)!.fullName,
            label: 'airports',
            labelStyle: fixLabel
              ? {
                  // Move the x-axis label with style
                  transform: 'translateY(30px)',
                }
              : {},
          },
        ]}
        // Modify the margin
        margin={fixMargin ? { top: 50, right: 5, bottom: 80, left: 100 } : undefined}
        sx={
          fixLabel
            ? {
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  // Move the y-axis label with CSS
                  transform: 'translateX(-35px)',
                },
              }
            : {}
        }
        // Other props
        height={300}
        dataset={usAirportPassengers}
        series={[
          { dataKey: 'Ekonomi', label: 'Ekonomi' },
          { dataKey: 'Arbetsgivaransvar', label: 'Arbetsgivaransvar' },
          { dataKey: 'lU', label:'Ledning och uppföljning' },
          { dataKey: 'Arbetsmiljö', label: 'Arbetsmiljö' },
          { dataKey: 'Styrelsen', label: 'Styrelsen' },
        ]}
        slotProps={{ 
            legend: { 
                hidden: false ,
                direction: 'row',
                position: {
                    vertical: 'top',
                    horizontal: 'left',
                },
                itemMarkWidth: 20,
                itemMarkHeight: 4,
                markGap: 5,
                itemGap: 10,
            } 
        
        }}
        yAxis={[
          {
            valueFormatter: (value) => `${(value ).toLocaleString()}(h)`,
            label: 'Tid',
          },
        ]}
        
      />
    </Box>
  );
}
const usAirportPassengers = [
  {
    fullName: 'Januari',
    code: 'Januari',
    Ekonomi: 45,
    Arbetsgivaransvar: 36,
    lU: 20,
    Arbetsmiljö: 53,
    Styrelsen: 51,
  },
  {
    fullName: 'Feburari',
    code: 'Feburari',
    Ekonomi: 35,
    Arbetsgivaransvar: 30,
    lU: 18,
    Arbetsmiljö: 35,
    Styrelsen: 32,
  },
  {
    fullName: 'Mars',
    code: 'Mars',
    Ekonomi: 35,
    Arbetsgivaransvar: 31,
    lU: 19,
    Arbetsmiljö: 36,
    Styrelsen: 33,
  },
  {
    fullName: 'April',
    code: 'April',
    Ekonomi: 36,
    Arbetsgivaransvar: 32,
    lU: 20,
    Arbetsmiljö: 37,
    Styrelsen: 33,
  },
  {
    fullName: 'Maj',
    code: 'Maj',
    Ekonomi: 37,
    Arbetsgivaransvar: 33,
    lU: 21,
    Arbetsmiljö: 37,
    Styrelsen: 34,
  },
  {
    fullName: 'Juni',
    code: 'Juni',
    Ekonomi: 38,
    Arbetsgivaransvar: 34,
    lU: 22,
    Arbetsmiljö: 37,
    Styrelsen: 34,
  },
  {
    fullName: 'Juli',
    code: 'Juli',
    Ekonomi: 39,
    Arbetsgivaransvar: 35,
    lU: 23,
    Arbetsmiljö: 38,
    Styrelsen: 35,
  },
  {
    fullName: 'Augusti',
    code: 'Augusti',
    Ekonomi: 40,
    Arbetsgivaransvar: 36,
    lU: 24,
    Arbetsmiljö: 38,
    Styrelsen: 35,
  },
  {
    fullName: 'September',
    code: 'September',
    Ekonomi: 41,
    Arbetsgivaransvar: 37,
    lU: 25,
    Arbetsmiljö: 39,
    Styrelsen: 36,
  },
  {
    fullName: 'Oktober',
    code: 'Oktober',
    Ekonomi: 42,
    Arbetsgivaransvar: 38,
    lU: 26,
    Arbetsmiljö: 39,
    Styrelsen: 36,
  },
  {
    fullName: 'November',
    code: 'November',
    Ekonomi: 43,
    Arbetsgivaransvar: 39,
    lU: 27,
    Arbetsmiljö: 40,
    Styrelsen: 37,
  },
  {
    fullName: 'December',
    code: 'December',
    Ekonomi: 44,
    Arbetsgivaransvar: 40,
    lU: 28,
    Arbetsmiljö: 40,
    Styrelsen: 37,
  },
];
