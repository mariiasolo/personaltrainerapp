import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL, APi_URL} from '../constants';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';




function Trainings() {
    const gridRef = useRef();
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);

    const [columns] = useState([
        {field: 'date', sortable: true, type: 'date', filter: true,  valueFormatter: (params) => moment(params.value).format('DD.MM.YYYY, h:mm:ss a')},
        {field: 'duration', sortable: true, filter: true, width: 120},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: 'Customer',
            width: 130,
            sortable: true, 
            filter: true,
            field: 'customer.firstname'
        },
        {
            headerName: '',
            width: 130,
            sortable: true, 
            filter: true,
            field: 'customer.lastname'
          },
        {
            headerName: '',
            width: 100,
            field: 'id',
            cellRenderer: params => 
            <Tooltip title="Delete training">
            <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
            </Tooltip>
          }
        
    ])

    useEffect(() => {
        fetchTraining();
    }, 
    []);

    const fetchTraining = () => {
        fetch(API_URL +'/gettrainings')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert ('Something went wrong in fetch!');
        })
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure? The action cannot be undone!')){
            fetch(API_URL + '/api/trainings/' + id, { method: 'DELETE' })
            .then(response => {
                if (response.ok){
                    setOpen(true);
                    fetchTraining();
                } else {
                    alert('Something went wrong in deletion!');
                }
            })
            .catch(err => console.error(err))
        }
    }

    const exportButton = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);
    
    return(
        <div className="ag-theme-material" style={{ height: 500, width: '100%', margin: 20}}>
        <Stack direction="row" spacing={2} m={2} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Tooltip title="Export file">
        <IconButton variant="outlined" onClick={exportButton}>
          <FileDownloadIcon />
        </IconButton>
        </Tooltip>

        </Stack>
          <div className="ag-theme-material" style={{height: 700, width: '100%'}}>
          <AgGridReact
                ref={gridRef}
                columnDefs={columns}
                rowData={training}
                pagination={true}
                paginationPageSize={12}
                suppressCellFocus={true}
                suppressExcelExport={true}
               />
              
          </div>

          <Snackbar 
             open={open}
             autoHideDuration={2000}
             onClose={() => setOpen(false)}
             message="Training was deleted successfully!"
          />
            
        </div>
    );


}
export default Trainings;

