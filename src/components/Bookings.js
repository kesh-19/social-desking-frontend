
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';
import BookingCard from './BookingCard';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
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
    const dataUrl = 'https://8000-crimson-chicken-jmc0octb.ws-us14.gitpod.io'

    const [bookings, setBookings] = useState([])
    
    useEffect(() => {
        fetch(dataUrl + '/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])

    return (
        bookings.map(booking => (
            <BookingCard booking={booking} key={booking.userid} />
        ))
    )
}

export default Bookings;
