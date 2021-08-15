import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OfficeCard from './OfficeCard';
import { CircularProgress, Typography } from '@material-ui/core';
import Config from '../Config';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));


const CreateBooking = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [buildingList, setBuildingList] = useState([]);

    
    const getBuildingData = async () => {
        setLoading(true);
        const res = await fetch(`${Config.serverUrl}/desking/buildings`);
        const buildings = await res.json();
        setBuildingList(buildings);
        setLoading(false);
    }

    useEffect(() => {
        getBuildingData();
    }, []);

    return (
        <>
            {
                loading ? (
                    <div style = {{ margin: "2em", width: "100%", display: "flex", justifyContent: "center" }}>
                        <Typography variant="h5" gutterBottom>
                            <CircularProgress size={20} color="inherit" /> Loading...
                        </Typography>
                    </div>
                ) : (<>
                    <Typography variant="h4" gutterBottom>
                        All Buildings
                    </Typography>
                    <div className={classes.root}>
                        <Grid
                            container
                            justifyContent="flex-start"
                            alignItems="center">
                            {
                                buildingList.map((item) => (
                                    <Grid key={item.buildingId} item xs={12} sm={4} md={4} key={item.buildingId}>
                                        <OfficeCard
                                            buildingName={item.buildingName}
                                            buildingId={item.buildingId}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                </>)
            }</>
    );
}

export default CreateBooking;

