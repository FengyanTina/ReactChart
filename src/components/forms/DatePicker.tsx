import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';
import 'dayjs/locale/sv';
dayjs.locale('sv'); 
export default function DatePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box >
        <DatePicker
        slots={{
            textField: (params) => (
              <TextField
                {...params}
                required
                
              />
            ),
          }}
          label="Due Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          format="YYYY-MM-DD"
        />
      </Box>
    </LocalizationProvider>
  );
}
