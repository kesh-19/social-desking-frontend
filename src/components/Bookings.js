
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';
import BookingCard from './BookingCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
    const dataUrl = 'https://exp1spring.herokuapp.com/desking/'
    const userId = 1
    localStorage.setItem('userId', userId)
    let [bookings, setBookings] = useState([])
    
    useEffect(() => {
        
        fetch(dataUrl + 'booking/' + localStorage.getItem('userId'))
            .then(res => res.json())
            .then(data => {
                console.log("Bookings : ", data)
                setBookings(data)})
    //     setBookings([
    //         [
    //             {
    //                 "seatId": "S1",
    //                 "buildingId": "B1",
    //                 "floorNo": 1
    //             },
    //             {
    //                 "bookingId": 1,
    //                 "dateOfBooking": "190201223"
    //             }
    //         ],
    //         [
    //             {
    //                 "seatId": "S2",
    //                 "buildingId": "B2",
    //                 "floorNo": 2
    //             },
    //             {
    //                 "bookingId": 2,
    //                 "dateOfBooking": "190201224"
    //             }
    //         ]
    //     ])
            
     }, [])

    const cancelBooking = (bookingId) => {
        axios.delete(dataUrl + 'booking/' + bookingId)
            .then(res => {
                console.log(res)
                console.log(res.data)
                
            })
        setBookings(bookings.filter(booking => booking[1].bookingId !== bookingId))
        console.log(bookings)
        console.log("BookingId:", bookingId)
    }

    return (
        <div className={classes.root}>
            <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center">
                { 
                    
                    bookings.map(booking => (
                        <Grid item xs={12} sm={6} md={4}>
                            <BookingCard 
                            booking={booking}
                            cancelBooking = {cancelBooking}
                            key={booking.userid} />
                        </Grid>
                    ))
                }
                </Grid>
        </div>
        
    )
}

export default Bookings;
