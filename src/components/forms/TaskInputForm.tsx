
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePickerValue from './DatePicker';
import TimePickerValue from './TimePicker';

export default function TaskInput() {
  return (
<>
<Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },display:'flex' ,flexDirection:'column',alignContent:'center',alignItems:'start'}}>


    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },display:'flex' ,flexDirection:'column'}}
      noValidate
      autoComplete="off"
    >
        <TextField
          required
          id="standard-required"
          label="Title"
          slotProps={{
            inputLabel: {
              shrink: true,      // Keeps the label above the field even when empty
            },
          }}
          variant="standard"
        />
          <TextField
          id="standard-multiline-static"
          label="Detail"
          multiline
          rows={2}
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,      // Keeps the label above the field even when empty
            },
          }}
        />
        <TextField
          id="standard-number"
          label="Hour"
          type="number"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
    </Box>
    <Box  sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },display:'flex' ,flexDirection:'column',}}>

       <DatePickerValue/>
        <TimePickerValue/>    
    </Box>
    </Box>
    </>
  );
}
