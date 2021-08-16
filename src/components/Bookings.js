
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';
import BookingCard from './BookingCard';
import Config from '../Config'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    media: {
        height: 140,
    },
    content: {
        padding: "0.5em",
    },
    button: {
        margin: "1em",
        display: "flex",
        justifyContent: "center"
    }
}));

const Bookings = () => {
    
    const classes = useStyles();
    const dataUrl = `${Config.serverUrl}/desking/booking/`
    const userId = JSON.parse(window.localStorage.getItem('user')).userId

    let [bookings, setBookings] = useState([])
    let [oldBookings, getOldBookings] = useState([])
    let [showOldBookings, setOldBookings] = useState(false)
    
    useEffect(() => {
        
        fetch(dataUrl + userId)
            .then(res => res.json())
            .then(allBookings => {
                let upcomingBookings = allBookings
                
                    upcomingBookings = allBookings.filter(booking => {
                        
                        return (new Date(booking[1].dateOfBooking) > new Date())
                    })
                
                let oldBooks = allBookings.filter(booking => {
                    
                    return (new Date(booking[1].dateOfBooking) < new Date())
                })

                getOldBookings(oldBooks)
               
                upcomingBookings.sort((a, b) => {
                    return new Date(a[1].dateOfBooking) - new Date(b[1].dateOfBooking)
                })
                setBookings(upcomingBookings)})
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
        axios.delete(dataUrl + bookingId)
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
                            old = {false}
                            cancelBooking = {cancelBooking}
                            key={booking.userid} />
                        </Grid>
                    ))
                }
                </Grid>
                <div className={classes.button}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => setOldBookings(!showOldBookings)}
                        >
                        {
                            showOldBookings ? 'Hide Past Bookings' : 'Show Past Bookings'
                        }
                    </Button>
                   
                </div>
                {showOldBookings && 
                    <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center">
                { 
                    
                    oldBookings.map(booking => (
                        <Grid item xs={12} sm={6} md={4}>
                            <BookingCard 
                            booking={booking}
                            old={true}
                            cancelBooking = {cancelBooking}
                            key={booking.userid} />
                        </Grid>
                    ))
                }
                </Grid>
                }
        </div>
        
    )
}

export default Bookings;
