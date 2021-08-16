import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid, 
  GridToolbarContainer,
  GridToolbarExport, } from '@material-ui/data-grid';

import Config from '../Config'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, bookingid, seatid, buildingid, floorno, dob) {
  return { id, bookingid, seatid, buildingid, floorno, dob };
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
];

const AdminBookings = () => {

  const CustomToolbar = () => {
    return    (<GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>)
  }
  const classes = useStyles();
  const dataUrl = `${Config.serverUrl}/desking/booking/alldetails`
  const [allBookings, setAllBookings] = useState([])

  useEffect(() => {
    fetch(dataUrl)
      .then(res => res.json())
      .then(data => {
        console.log("Allbookings: ", data)
        const rows = data.map((booking) => {
          return createData(booking[0], booking[3], booking[5], booking[7], booking[6], booking[4])
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