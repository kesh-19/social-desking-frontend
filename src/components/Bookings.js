
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';
import BookingCard from './BookingCard';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        textAlign: "left",
        margin: "1em 0",
    },
    media: {
        height: 140,
    },
    content: {
        padding: "0.5em",
    }
}));

const Bookings = () => {
    
    
    const classes = useStyles();
    const dataUrl = 'http://localhost:8000'

    //const [bookings, setBookings] = useState([])
    const bookings = [
        {
          "bookingId": "bid1",
          "dateOfBooking": "13-7-2021",
          "userId": "U1",
          "seatId": "S1"
        },
        {
          "bookingId": "bid1",
          "dateOfBooking": "13-7-2021",
          "userId": "U1",
          "seatId": "S1"
        },
        {
          "bookingId": "bid1",
          "dateOfBooking": "13-7-2021",
          "userId": "U1",
          "seatId": "S1"
        },
        {
          "bookingId": "bid1",
          "dateOfBooking": "13-7-2021",
          "userId": "U1",
          "seatId": "S1"
        }
      ]
    // useEffect(() => {
    //     fetch(dataUrl + '/bookings')
    //         .then(res => res.json())
    //         .then(data => setBookings(data))
    // }, [])

    return (
        bookings.map(booking => (
            <BookingCard bookingId={booking.bookingId} key={booking.userid} />
        ))
    )
}

export default Bookings;
