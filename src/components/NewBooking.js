import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useState } from 'react'
import image from '../images/floor1.jpg';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Divider from '@material-ui/core/Divider';
import DateSelector from './DateSelector';
import LinearProgress from '@material-ui/core/LinearProgress';
import useNewBookingStyles from '../styles/NewBookingStyles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SeatGrid from './SeatGrid';

const NewBooking = (props) => {
    const classes = useNewBookingStyles();
    const [floor, setFloor] = useState('1');
    const [date, setDate] = useState(new Date('2021-08-18T21:11:54'));
    const [desk, setDesk] = useState(17);
    // const [image, setImage] = useState(null);
    let floors = [1, 2, 3]
    let progress = 76

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    console.log(props);

    useEffect(() => {
        console.log(date);
    }, [date])
    // useEffect(() => {
    //     console.log(floor,'a');
    //     import('../images/floor'+floor+'.jpg').then(image => setImage(image))
    // }, [floor])

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Booking Desk at {props.location.buildingName}
                    </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box className={classes.paper}>
                        <Box className={classes.listChip}>
                            <Chip
                                color="primary"
                                label="Select and View Floor"
                                variant="outlined"
                                className={classes.chip}
                            />
                        </Box>
                        <Box className={classes.formControlBox}>
                            {/* <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Floor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={floor}
                                    onChange={handleChange}
                                    label="floor"
                                >
                                {
                                    floors.map((item, index) => (
                                        <MenuItem value={item} key={index}>Floor {item}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                             */}
                            <Grid container>
                                <Grid item xs={3}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Floor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={floor}
                                            onChange={handleChange}
                                            label="floor"
                                        >
                                            {
                                                floors.map((item, index) => (
                                                    <MenuItem value={item} key={index}>Floor {item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box className={classes.progress}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress}
                                            color={progress > 75 ? 'secondary' : 'primary'}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3} className={classes.percentage}>
                                    {progress}% full
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box className={classes.image}>
                        <Zoom>
                            <img src={image} alt={"floor" + floor} height="200" width="370" />
                        </Zoom>
                    </Box>
                    <Box className={classes.image}>
                        Click on the image to Zoom
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />

                <Grid item xs={12} md={4}>
                    <Box className={classes.paper}>
                        <Box className={classes.listChip}>
                            <Chip
                                color="primary"
                                label="Select Date"
                                variant="outlined"
                                className={classes.chip}
                            />
                        </Box>
                        <DateSelector date={date} setDate={setDate} />
                    </Box>
                    <Box className={classes.paper}>
                        <Box className={classes.listChip}>
                            <Chip
                                color="primary"
                                label="Select Desk"
                                variant="outlined"
                                className={classes.chip}
                            />
                        </Box>
                        <SeatGrid />
                    </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                {
                    date &&
                    <Grid item xs={12} md={3}>
                        <Box className={classes.paper}>
                            <Box className={classes.listChip}>
                                <Chip
                                    color="primary"
                                    label="Booking Details"
                                    variant="outlined"
                                    className={classes.chip}
                                />
                            </Box>

                            <Box>
                                <Typography variant="h6">
                                    LOCATION
                                </Typography>
                                {/* <Divider variant="inset"  /> */}
                                <Typography variant="overline" display="block" gutterBottom>
                                    Yerawda
                                </Typography>

                                <Typography variant="h6">
                                    FLOOR
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Floor {floor}
                                </Typography>

                                <Typography variant="h6">
                                    DATE
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    {date.getDate()} / {date.getMonth()} / {date.getFullYear()}
                                </Typography>

                                <Typography variant="h6">
                                    Desk
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    28
                                </Typography>
                            </Box>

                            <Box>
                                <Button variant="contained" className={classes.confirmButton}>
                                    <CheckCircleOutlineIcon /> &nbsp;
                                    Confirm Booking
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                }
            </Grid>
        </div>
    );
}

export default NewBooking;