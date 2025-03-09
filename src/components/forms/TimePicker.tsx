import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';

export default function TimePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2}>
        <TimePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          ampm={false}  // Optional: Use 24-hour format (default in Swedish locale)
        />
      </Box>
    </LocalizationProvider>
  );
}
