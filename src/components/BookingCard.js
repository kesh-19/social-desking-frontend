import React from 'react'
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

const BookingCard = ({booking}) => {

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            
            <CardContent>
                <Typography variant="h5" gutterBottom>
                   Seat No : {booking.seatId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Date of reservation : {booking.dateOfBooking}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Booking ID : {booking.bookingId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Building : B1
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                        Floor : 1  
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "1em"}}>
                <Button variant="contained" size="small" color="secondary">
                   Cancel booking
                </Button>
            </CardActions>
        </Card>
    )
}

export default BookingCard
