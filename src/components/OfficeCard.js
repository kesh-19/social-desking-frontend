
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import bg from '../images/DB2.jpg';
import { Link, useRouteMatch } from 'react-router-dom'

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

const OfficeCard = ({buildingName, address, buildingId}) => {

    const classes = useStyles();
    let { url } = useRouteMatch();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={bg}
                title="office"
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {buildingName} {buildingId}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Address : {address}
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "1em" }}>
                <Link to={{
                    pathname: `${url}/${buildingId}`,
                    buildingName,
                    address
                }}>
                    <Button variant="contained" size="small" color="primary">
                        Book a Seat
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default OfficeCard;
