import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    // table: {
    // //   maxWidth: 50,
    //     width: 'fit-content',
    //     border: '1px solid #f7f7f7'
    // },
    // tableCell: {
    //     fontSize: '13px',
    //     // maxWidth: '1rem'
    // },
    // textBold: {
    //     fontSize: '13px',
    //     fontWeight: 'bold'
    // }
  });
  
const createData = (name, building, floor, desk, buildingId) => {
    return { name, building, floor, desk, buildingId };
}

const TeammateDisplayBig = ({date,teammate}) => {
    let history = useHistory()
    const rows = [];
    teammate.forEach(item => {
        rows.push(createData(item['First Name']+' '+item['Last Name'], item['Building'], item['Floor'], item['Seat ID'], item['Building ID']))
    })
      
    const redirect = (buildingId, floor, desk) => {
        history.push({
            pathname: '/index/'+ buildingId,
            byRec: {
                buildingId,
                floor,
                desk,
                date
            }
        })
    }
    
    return ( 
        <TableContainer>
            <Table aria-label="simple table" size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Teammate</TableCell>
                    <TableCell>Building</TableCell>
                    <TableCell>Floor</TableCell>
                    <TableCell>Desk</TableCell>
                    <TableCell>Booking</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell>{row.building}</TableCell>
                        <TableCell>{row.floor}</TableCell>
                        <TableCell>{row.desk}</TableCell>
                        <TableCell>
                            <Button onClick={() => redirect(row.buildingId, row.floor, row.desk)} variant="contained" size="small" color="primary">
                                Book Here
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
     );
}
 
export default TeammateDisplayBig;