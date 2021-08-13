import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';

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

const BookingCard = ({bookingId}) => {

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={bg}
                title="office"
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                   Helo
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Address
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "1em" }}>
                <Button variant="contained" size="small" color="primary">
                    {bookingId}
                </Button>
            </CardActions>
        </Card>
    )
}

export default BookingCard
