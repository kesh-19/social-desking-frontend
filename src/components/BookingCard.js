import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, Typography } from '@material-ui/core';

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
                    onClick={() => {cancelBooking(booking[1].bookingId)}}>
                   Cancel booking
                </Button>
            </CardActions>
        </Card>
    )
}

export default BookingCard
