import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddTraining({ addTraining, params }) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({...training, customer: params});
    console.log(params);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
	  setOpen(false);
  };

  const handleChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  };

  return (
    <div>
    {/* adding text when hoovering add sign  */}
      <Tooltip title="Add new training">
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training </DialogTitle>
           <DialogContent>
               
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                margin="dense"
                name = "date"
                label="Date"
                onChange={newValue => {
                  setTraining({...training, date: newValue});
                }}
                renderInput = {(params) => <TextField variant='standard' {...params} />}
                value={training.date}
                fullWidth
                />
            </LocalizationProvider>    
                
            <TextField
              margin="dense"
              name = "duration"
              value = {training.duration}
              onChange = {handleChange}
              label="Duration"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              name = "activity"
              value = {training.activity}
              onChange = {handleChange}
              label="Activity"
              fullWidth
              variant="standard"
            />
          
          </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      
      </Dialog>
        
    </div>
  );
}

export default AddTraining;

 