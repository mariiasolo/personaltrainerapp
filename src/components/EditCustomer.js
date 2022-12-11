import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

function EditCustomer( {params, updateCustomer} ) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '', 
    city: '',
    email: '',
    phone: ''
    });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(params.value)
    setCustomer({
      firstname: params.data.firstname,
      lastname: params.data.lastname,
      streetaddress: params.data.streetaddress,
      postcode: params.data.postcode,
      city: params.data.city,
      email:params.data.email,
      phone:params.data.phone
    })
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateCustomer(customer, params.value);
    setOpen(false);
  };

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }
  
  return (
    <div>
      <Tooltip title="Edit customer">
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name = "firstname"
              label="First Name"
              fullWidth
              variant="standard"
              value = {customer.firstname}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "lastname"
              label="Last Name"
              fullWidth
              variant="standard"
              value = {customer.lastname}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "streetaddress"
              label="Street Address"
              fullWidth
              variant="standard"
              value = {customer.streetaddress}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "postcode"
              label="Postcode"
              fullWidth
              variant="standard"
              value = {customer.postcode}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "city"
              label="City"
              fullWidth
              variant="standard"
              value = {customer.city}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "email"
              label="Email"
              fullWidth
              variant="standard"
              value = {customer.email}
              onChange = {inputChanged}
              
            />
            <TextField
              margin="dense"
              name = "phone"
              label="Phone"
              fullWidth
              variant="standard"
              value = {customer.phone}
              onChange = {inputChanged}
              
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

export default EditCustomer;