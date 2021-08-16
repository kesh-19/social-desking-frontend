import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OfficeCard from './OfficeCard';
import { CircularProgress, Typography } from '@material-ui/core';
import Config from './Config';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Recommendations from './Recommendations';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const CreateBooking = (props) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [buildingList, setBuildingList] = useState([]);
    const [openToast, setOpenToast] = React.useState(false);
    
    const getBuildingData = async () => {
        setLoading(true);
        const res = await fetch(`${Config.serverUrl}/desking/buildings`);
        const buildings = await res.json();
        setBuildingList(buildings);
        setLoading(false);
    }

    const handleToastClick = () => {
        setOpenToast(true);
    };

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    useEffect(() => {
        getBuildingData();
        if (props.history.location.byLogin) handleToastClick()
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
                    <Recommendations />
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
                                    <Grid key={item.buildingId} item xs={12} sm={4} md={4}>
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
            }
            
            <Snackbar open={openToast} autoHideDuration={4000} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} severity="success">
                Signed In as {JSON.parse(window.localStorage.getItem('user')).fName}!
                </Alert>
            </Snackbar>
            </>
    );
}

export default CreateBooking;

