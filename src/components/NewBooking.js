import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import useNewBookingStyles from '../styles/NewBookingStyles';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import SeatGrid from './SeatGrid';
import Config from '../Config'

const NewBooking = (props) => {
    const classes = useNewBookingStyles();
    const [floor, setFloor] = useState(1);
    const [floors, setFloors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState(false);
    const [date, setDate] = useState(new Date('2021-08-18T21:11:54'));
    const [desk, setDesk] = useState(17);
    const [image, setImage] = useState(null);
    let progress = 76

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    // console.log(props);
    
    useEffect(() => {
        setLoading(true)
        let buildingId = 6

        fetch(Config.serverUrl + '/desking/buildings/')
            .then(res => res.json())
            .then(data => {

                // setBuilding
                data = data.filter(item => item.buildingId === buildingId)
                if (data.length) data = data[0]
                setBuilding(data)
                console.log(data)

                //set Number of Floors
                let floorBuilder = []
                for (let i=1; i<=data.noOfFloor; i++) {
                    floorBuilder.push(i)
                }
                setFloors(floorBuilder)

                setLoading(false)
            })
    }, [props.match.params.id])

    useEffect(() => {
        let floorId = floor
        if (floor > 3) 
            floorId = floor % 3
            if (floorId === 0)
                floorId = 3

        console.log(floorId);
        import('../images/floor'+floorId+'.jpg').then(image => {
            setImage(image.default)
        })
    }, [floor])

    const handleSubmit = () => {
        let result = {
            buildingId: building.buildingId,
            bookingFloor: floor,
            bookingDate: date,
            bookingDesk: desk
        }
        result = JSON.stringify(result);
        alert(result)
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
                                    <p>{progress}% full</p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box className={classes.image}>
                        <Zoom>
                            <img src={image} alt={"floor"+floor} height="200" width="370" />
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
                        <SeatGrid/>
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
                                        {date.getDate()} / {date.getMonth()+1} / {date.getFullYear()}
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
                                        28
                                    </Typography>
                                </Box>

                                <Box>
                                    <Button 
                                        variant="contained" 
                                        className={classes.confirmButton} 
                                        onClick={handleSubmit}
                                        disabled={!building}
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
                                </Box>
                            </Box>
                        </Grid>
                }
                </Grid>
            </div>
     );
}
 
export default NewBooking;