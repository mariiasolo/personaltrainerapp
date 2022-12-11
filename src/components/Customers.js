import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL, APi_URL} from '../constants';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function Customers() {
    const gridRef = useRef();
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [columns] = useState([
        {field: 'firstname', sortable: true, filter: true, width: 130},
        {field: 'lastname', sortable: true, filter: true, width: 130},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true, width: 125},
        {field: 'city', sortable: true, filter: true, width: 110},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true, width: 110},
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <AddTraining params = {params.value} addTraining = {addTraining} />
        },
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <EditCustomer params = {params} updateCustomer = {updateCustomer} />
        },
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => 
            <Tooltip title="Delete customer">
                <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        }
    ]);


    useEffect(() => {
        getCustomers();
    }, 
    []);

    const getCustomers = () => {
        fetch(API_URL + '/api/customers')
        .then(response => {
            if (response.ok)
                return response.json();
            else 
                alert ('Something went wrong in fetch!');
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure? The action can not be undone!')){
            fetch(url, { method: 'DELETE' })
            .then(response => {
               if (response.ok){
                    setOpen(true);
                    getCustomers();
                  
                } else {
                    alert('Something went wrong in deletion');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch(API_URL + '/api/customers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(response => {
            if(response.ok) {
                getCustomers();
            }
            else{
                alert('Something went wrong in a customer addition!');
            }
        })
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch(API_URL + '/api/trainings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(response => {
            if(response.ok) {
                fetch(API_URL + '/api/trainings')
            }
            else{
                alert('Something went wrong when adding training!');
            }
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (updatedCustomer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedCustomer) 
        })
        .then(response => {
            if(response.ok) {
                getCustomers();
            }
            else{
                alert('Something went wrong when updating / editing the customer!');
            }
        })
        .catch(err => console.error(err))
    }

    const exportButton = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
      }, []);

    
    return(
        <>
        <Stack 
            direction="row" 
            spacing={1} 
            m={1} 
            display="flex" 
            justifyContent="flex-end" 
            alignItems="flex-end">
                
            <AddCustomer addCustomer={addCustomer} />

            <Tooltip title="Export file">
                <IconButton variant="outlined" onClick={exportButton}>
                    <FileDownloadIcon />
                </IconButton>
            </Tooltip>

                
        </Stack>

        <div className="ag-theme-material" style={{height: 700, width: '100%'}}>
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
                pagination={true}
                paginationPageSize={9}
                suppressCellFocus={true}
                ref={gridRef}
                suppressExcelExport={true}
            />
        </div>

        <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message="The customer was deleted successfully!"
        />
            
        </>
    );



}
export default Customers;