
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

    const [bookings, setBookings] = useState([])
    
    useEffect(() => {
        axios.get(dataUrl + 'booking/' + userId, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))
            console.log(bookings)
    }, [])

    return (
        <div className={classes.root}>
            <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center">
                { 
                    bookings.map(booking => (
                        <Grid item xs={12} sm={6} md={4}>
                            <BookingCard booking={booking} key={booking.userid} />
                        </Grid>
                    ))
                }
                </Grid>
        </div>
        
    )
}

export default Bookings;
