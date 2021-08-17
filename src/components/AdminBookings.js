import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import { DataGrid, 
  GridToolbarContainer,
  GridToolbarExport, } from '@material-ui/data-grid';

import Config from './Config'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, bookingid, seatid, buildingid, floorno, dob, email) {
  return { id, bookingid, seatid, buildingid, floorno, dob, email };
}


const columns = [
  { 
    field: 'id', 
    headerName: 'Emp ID', 
    width: 150 
  },
  {
    field: 'bookingid',
    headerName: 'Book',
    width: 150,
    editable: true,
  },
  {
    field: 'seatid',
    headerName: 'Seat',
    width: 150,
    editable: true,
  },
  {
    field: 'buildingid',
    headerName: 'Buil ID',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'floorno',
    headerName: 'Flr',
    width: 160,
    
  },
  {
    field: 'dob',
    headerName: 'Date of booking',
    width: 160,
    
  },
  {
    field: 'email',
    headerName: 'Contact',
    width: 160,
    renderCell: (params ) => (
      <a style={{textDecoration: 'none'}} 
        href={`mailto:${params.value}`}>
      <Button
      variant="contained"
          color="primary"
          size="small"
          
          >
        Contact user
      </Button>
      </a>
        
    )
    
  },
];

const AdminBookings = () => {

  const CustomToolbar = () => {
    return    (<GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>)
  }
  
  const dataUrl = `${Config.serverUrl}/desking/booking/alldetails`
  const [allBookings, setAllBookings] = useState([])

  useEffect(() => {
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        console.log("Allbookings: ", data)
        const rows = data.map((booking) => {
          return createData(booking[0], booking[4], booking[6], booking[8], booking[7], new Date(booking[5]).toDateString(), booking[3])
        })
        setAllBookings(rows)
      })
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      
      <DataGrid
        rows={allBookings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default AdminBookings;