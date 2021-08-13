import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OfficeCard from './OfficeCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const CreateBooking = () => {
    const classes = useStyles();

    const dummyOfficeList = [
        {
            id: 1,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
        {
            id: 2,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
        {
            id: 3,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
        {
            id: 4,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
        {
            id: 5,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
        {
            id: 6,
            buildingName: "Yerawda",
            address: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur",
        },
    ];

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Recommended
            </Typography>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center">

                    {
                        dummyOfficeList.map((item) => (
                            <Grid item xs={12} sm={4} md={4} key={item.id}>
                                <OfficeCard
                                    buildingName={item.buildingName}
                                    address={item.address}
                                    buildingId={item.id}
                                />
                            </Grid>
                        ))
                    }

                </Grid>
            </div>
            <br />
            <br />
            <Typography variant="h4" gutterBottom>
                All Buildings
            </Typography>
            <div className={classes.root}>
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center">
                    {
                        dummyOfficeList.map((item) => (
                            <Grid item xs={12} sm={4} md={4} key={item.id}>
                                <OfficeCard
                                    buildingName={item.buildingName}
                                    address={item.address}
                                    buildingId={item.id}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </>
    );
}

export default CreateBooking;

