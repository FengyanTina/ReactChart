import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import { StackOrderType } from '@mui/x-charts/models';

// Data coming from https://www.insee.fr/fr/statistiques/5013868
const uncomletedTime = [
  60, 44, 37, 19.6, 29.9, 20.7, 19.5, 18, 18, 10, 15, 15.9, 15.2, 0,
  0, 0,0, 0, 0, 0, 0, 0, 0, 40, 50, 50, 60, 70,
 80, 0, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,];
const completedTime = [
  40, 56, 63, 80.4, 70.2, 79.3, 80.5, 82, 82, 90, 85, 84.1, 84.8, 100,
  100, 100, 100, 100, 100, 100, 100, 100, 100, 60,50,50,40, 30,
  20, 100,0,
];


const xAxis = {
  label: 'Week number (2025)',
  scaleType: 'band' as const,
  data: [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '30',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
  ],
};

const series = [
  { label: 'Done', data: completedTime, stack: 'total' },
  { label: 'Incomplete', data: uncomletedTime , stack: 'total' },
 
];

const availableStackOrder = [
  'none',
  'weekly',
  'monthly',
  'yearly',
  
] as const;

const yAxis = {
      
};
export default function StackOrderDemo() {
  const [stackOrder, setStackOrder] = React.useState<StackOrderType>('none');

  const modifiedSeries = [{ ...series[0], stackOrder }, ...series.slice(1)];
  
  
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        sx={{ minWidth: 100, mx: 5, mt: 1,maxHeight:20,
          
            
            "& .MuiInputBase-root": {
              height: 30, // Ensure input field height is also adjusted
              border: "none", // Remove the border
              boxShadow: "none",
              fontSize: "0.6rem",
              borderBottom:"none"
            },
            "& .MuiInputLabel-root": {
        fontSize: "0.7rem", // Label (stackOrder) text size
      },
      "& .MuiSelect-select": {
        fontSize: "0.6rem", // Selected value text size
        padding: "2px", // Adjust padding to make it fit
      },
         }}
        select
        variant="standard" 
        label="Select Time"
        value={stackOrder}
        onChange={(event) => setStackOrder(event.target.value as any)}
      >
        {availableStackOrder.map((offset) => (
          <MenuItem sx={{ fontSize: "0.6rem" }} key={offset} value={offset}>
            {offset}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ overflow: 'auto', py: 2, my:3,px:3 }}>
        <BarChart
          width={700}
          height={150}
          xAxis={[
            {
              ...xAxis,
              tickLabelStyle: {
                fontSize: '10px',
                angle: 45,
                dominantBaseline: 'hanging',
                textAnchor: 'start',
              },
              labelStyle: {
                transform: 'translateY(10px)',
                fontSize: '12px',
              },
            },
          ]}
          series={modifiedSeries}
          slotProps={{
            legend: {
              labelStyle: { fontSize: '12px', }, // Adjust legend text size
          
            itemMarkWidth: 20,
                itemMarkHeight: 4,
                markGap: 5,
                itemGap: 10,
            }, 
        }}
          yAxis={[
            { 
                label: 'Status(%)',
                tickLabelStyle: {
                    fontSize: '10px',

                  },
                labelStyle: {
                    fontSize: '12px',
                 
                  },
                  min: 0,
                  max: 100,
          
            }
            
            
        ]}
          
        
        />
      </Box>
    </Box>
  );
}
