import Grid from '@material-ui/core/Grid';
import { Typography, Box, Modal, LinearProgress } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useState } from 'react'
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Divider from '@material-ui/core/Divider';
import DateSelector from './DateSelector';
import useNewBookingStyles from '../styles/NewBookingStyles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import SeatGrid from './SeatGrid';
import Config from './Config'
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const NewBooking = (props) => {

    let history = useHistory();

    const classes = useNewBookingStyles();
    const [floor, setFloor] = useState(1);
    const [floors, setFloors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState({});
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [bookableSeatsByFloor, setBookableSeatsByFloor] = useState({});
    const [floorProgress, setFloorProgress] = useState(0);

    const [seatList, setSeatList] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selected, setSelected] = useState(0);

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);

    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateSeatBlockedStatus = async () => {
        const newSeatList = [...seatList];
        await axios.put(`${Config.serverUrl}/desking/seat/block/${seatList[selected - 1].seatId}`);
        newSeatList.map((item) => {
            if (item.seatId === newSeatList[selected - 1].seatId) {
                return {
                    ...item,
                    blocked: !item.blocked
                }
            } else {
                return item;
            }
        });
        setSeatList(newSeatList);
        setSelected(0);
        handleClose();
        history.go(0);
    }

    const body = (
        <div className={classes.modal}>
            <h2 id="simple-modal-title" style={{ textAlign: "center" }}>Do you want to modify seat?</h2>
            <p style={{ textAlign: "center" }}>Seat status will change from blocked to unblocked and vice versa</p>
            <br />
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Button variant="contained" color="primary" onClick={updateSeatBlockedStatus} style={{ marginRight: "1em" }}>Yes</Button>
                <Button variant="contained" color="secondary" onClick={handleClose}>No</Button>
            </div>

        </div>
    );

    const onDeskClick = (deskNumber) => {
        if (!seatList[deskNumber].blocked && deskNumber + 1 !== selected) {
            setSelected(deskNumber + 1);
        } else if (deskNumber + 1 === selected) {
            setSelected(0);
        }
        if (user.role === "admin" || user.role === "Admin") {
            if (seatList[deskNumber].blocked) {
                setSelected(deskNumber + 1);
            }
            handleOpen();
        }
    }

    const handleChange = (event) => {
        setFloor(event.target.value);
    };
    //console.log(props)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    useEffect(() => {
        setLoading(true)
        let buildingId = parseInt(props.match.params.id);

        let floorId = floor
        if (floor > 3)
            floorId = floor % 3
        if (floorId === 0)
            floorId = 3

        import('../images/floor' + floorId + '.jpg').then(image => {
            setImage(image.default)
        })

        fetch(Config.serverUrl + '/desking/buildings/')
            .then(res => res.json())
            .then(data => {

                // setBuilding
                const res = data.filter(item => item.buildingId === buildingId);
                setBuilding(res[0]);

                //set Number of Floors
                let floorBuilder = []
                for (let i = 1; i <= res[0].noOfFloor; i++) {
                    floorBuilder.push(i);
                }
                setFloors(floorBuilder)
                setLoading(false)
            })

        let bookableSeatsByFloor = {}
        fetch(`${Config.serverUrl}/desking/buildings/${parseInt(props.match.params.id)}`)
            .then(res => res.json())
            .then(data => {
                const seatList = data.filter(item => {
                    if (Object.keys(bookableSeatsByFloor).includes(item['floorNo'].toString())) {
                        if (!item.blocked) bookableSeatsByFloor[item.floorNo] += 1
                        
                    } else {
                        if (!item.blocked) bookableSeatsByFloor[item.floorNo] = 1
                        else bookableSeatsByFloor[item.floorNo] = 0
                    }
                    
                    return item.floorNo === floor
                });
                setSeatList(seatList);
                setBookableSeatsByFloor(bookableSeatsByFloor)
                // getFloorProgress(data).then((result) => setFloorProgress(result))
            });

        if (history.location.byRec) {
            let recommendataionObject = history.location.byRec
            setFloor(recommendataionObject.floor)
            setDate(new Date(recommendataionObject.date))
        }
    }, [floor, props.match.params.id])

    useEffect(() => {
        setSelected(0);
        let buildingId = parseInt(props.match.params.id);
        const strDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        fetch(`${Config.serverUrl}/desking/seatsbooked/${strDate}`)
            .then(res => res.json())
            .then(data => {
                const resSeats = data.filter((item) => item && item.floorNo === floor && item.buildingId === buildingId);
                setBookedSeats(resSeats);
            });

            
    }, [date, props.match.params.id, floor])

    useEffect(() => {
        if (Object.keys(bookableSeatsByFloor).includes(floor.toString())) {
            let reservedSeats = bookedSeats.length
            let totalAvailableSeats = bookableSeatsByFloor[floor]
            setFloorProgress(Math.round((reservedSeats/totalAvailableSeats)*100))
        }
        else {
            setFloorProgress(0)
        }
    }, [bookedSeats])



    const handleSubmit = async () => {

        const user = JSON.parse(window.localStorage.getItem("user"));

        if (moment().diff(date, 'days') > -1) {
            setIsError(true);
            setError("Date cannot be current date or past date");
            return;
        } else if (selected === 0) {
            setIsError(true);
            setError("Please Select a seat");
            return;
        } else if (typeof user === "undefined") {
            setIsError(true);
            setError("User not authenticated >:(");
            return;
        }

        let result = {
            dateOfBooking: date,
            seatID: seatList[selected - 1].seatId,
            userID: user.userId
        }
        //console.log(result)
        try {
            await axios.post(`${Config.serverUrl}/desking/booking/create`, result);
            history.push("/index/bookings");
        } catch (err) {
            setIsError(true);
            setError("There was an error");
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {
                        loading ? (
                            <Typography variant="h5" gutterBottom>
                                <CircularProgress size={20} color="inherit" /> Loading...
                            </Typography>
                        ) : (
                            <Typography variant="h5" gutterBottom>
                                Booking Desk at {building.buildingName}
                            </Typography>
                        )
                    }
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
                            <Grid container>
                                <Grid item xs={3}>
                                {/* <Grid item xs={12}> */}
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
                                            value={floorProgress}
                                            color={floorProgress > 75 ? 'secondary' : 'primary'}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={3} className={classes.percentage}>
                                    <p>{floorProgress}% full</p>
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
                        <Box className={classes.image}>
                            Scroll to see all Desks.
                        </Box>
                        <SeatGrid seatList={seatList} onDeskClick={onDeskClick} selected={selected} bookedSeats={bookedSeats} />
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
                                <Typography variant="h6" className={classes.bookingHeader}>
                                    LOCATION
                                </Typography>
                                {/* <Divider variant="inset"  /> */}
                                <Typography variant="overline" display="block" gutterBottom>
                                    {building.buildingName}
                                </Typography>

                                <Typography variant="h6" className={classes.bookingHeader}>
                                    DATE
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
                                </Typography>

                                <Typography variant="h6" className={classes.bookingHeader}>
                                    FLOOR
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    Floor {floor}
                                </Typography>

                                <Typography variant="h6" className={classes.bookingHeader}>
                                    Desk
                                </Typography>
                                <Typography variant="overline" display="block" gutterBottom>
                                    {selected}
                                </Typography>
                            </Box>

                            <Box>
                                <Button
                                    variant="contained"
                                    className={classes.confirmButton}
                                    onClick={handleSubmit}
                                    disabled={typeof user !== "undefined" && (user.role === "Admin" || user.role === "admin")}
                                >
                                    <CheckCircleOutlineIcon /> &nbsp;
                                    Confirm Booking
                                </Button>
                                {
                                    !building &&
                                    <Chip
                                        icon={<ErrorIcon />}
                                        label="Could not fetch Location data"
                                        color="secondary"
                                    />
                                }
                                {
                                    isError &&
                                    <Chip
                                        icon={<ErrorIcon />}
                                        label={error}
                                        color="secondary"
                                    />
                                }
                            </Box>


                        </Box>
                    </Grid>
                }
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default NewBooking;