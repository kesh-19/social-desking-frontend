
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

const OfficeCard = ({ buildingName, buildingId }) => {

    const classes = useStyles();
    let { url } = useRouteMatch();
    const [officeImage, setOfficeImage] = React.useState(null)

    React.useEffect(() => {
        import('../images/' + buildingName + '.PNG')
        .then((image) => setOfficeImage(image.default))
    }, [])

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={officeImage}
                title="office"
            />
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {buildingName}
                </Typography>
            </CardContent>
            <CardActions style={{ padding: "1em" }}>
                <Link
                    style={{ textDecoration: "none" }}
                    to={{
                        pathname: `${url}/${buildingId}`,
                        buildingName
                    }}>
                    <Button variant="contained" size="small" color="primary">
                        Book a Desk
                    </Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default OfficeCard;
