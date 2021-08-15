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

const BookingCard = ({booking}) => {
    const dataUrl = 'https://exp1spring.herokuapp.com/desking/'
    
    const cancelBooking = (bookingId) => {
        axios.delete(dataUrl + 'booking/' + bookingId)
            .then(res => {
                console.log(res)
                console.log(res.data)
                
            })
    }
    console.log("Booking Card : ", booking)
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            
            <CardContent>
                <Typography variant="h5" gutterBottom>
                   Seat No : {booking[0].seatId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Date of reservation : {booking[1].dateOfBooking}
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
                <Button variant="contained" size="small" color="secondary" onClick={cancelBooking(booking[1].bookingId)}>
                   Cancel booking
                </Button>
            </CardActions>
        </Card>
    )
}

export default BookingCard
