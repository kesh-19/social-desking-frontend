import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    table: {
        width: 'fit-content',
        border: '1px solid #f7f7f7'
    },
    tableCell: {
        fontSize: '13px',
    },
    textBold: {
        fontSize: '13px',
        fontWeight: 'bold'
    }
  });
  
const createData = (name, building, floor, desk, buildingId) => {
    return { name, building, floor, desk, buildingId };
}



const TeammateDisplay = ({teammate}) => {
    const classes = useStyles();
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
                desk
            }
        })
    }

    
    return ( 
        <TableContainer>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                <TableRow>
                    <TableCell className={classes.tableCell}>Teammate</TableCell>
                    <TableCell className={classes.tableCell}>Booking</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.name}>
                        <TableCell className={classes.tableCell} component="th" scope="row">
                            <Typography className={classes.textBold}>{row.name}</Typography>

                            <Typography className={classes.textBold} display="inline">Building:</Typography> {row.building}
                            <br/>
                            <Typography className={classes.textBold} display="inline">Floor:</Typography> {row.floor}
                            <br/>
                            
                            <Typography className={classes.textBold} display="inline">Desk:</Typography> {row.desk}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            <Button onClick={() => redirect(row.buildingId, row.floor, row.desk)} className={classes.tableCell} variant="contained" size="small" color="primary">
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
 
export default TeammateDisplay;