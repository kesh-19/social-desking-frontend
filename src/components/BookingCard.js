import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '345px'
    },
    media: {
        height: 140,
    },
    content: {
        padding: "0.5em",
    }
}));

const BookingCard = ({booking, old, cancelBooking}) => {
    
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleConfirm = (bookingId) => {
        handleClose()
        cancelBooking(bookingId)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Card className={classes.root}>
            
            <CardContent>
                <Typography variant="h5" gutterBottom>
                   Seat No : {booking[0].seatId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Date of reservation : {new Date(booking[1].dateOfBooking).toDateString()}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Booking ID : {booking[1].bookingId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Building : {booking[0].buildingId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Floor : {booking[0].floorNo} 
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "1em"}}>
        
                <Button 
                    variant="contained" 
                    disabled={old ? true : false}
                    size="small" 
                    color="secondary" 
                    onClick={() => {handleClickOpen()}}>
                   Cancel booking
                </Button>
                
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Confirm Delete booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot retrieve this booking
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go back
          </Button>
          <Button onClick={() => handleConfirm(booking[1].bookingId)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
            </CardActions>
        </Card>
    )
}

export default BookingCard
