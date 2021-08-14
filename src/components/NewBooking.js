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

const NewBooking = (props) => {
    const classes = useNewBookingStyles();
    const [floor, setFloor] = useState(1);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState(false);
    const [date, setDate] = useState(new Date('2021-08-18T21:11:54'));
    const [desk, setDesk] = useState(17);
    const [image, setImage] = useState(null);
    let floors = [1,2,3]
    let progress = 76

    const handleChange = (event) => {
        setFloor(event.target.value);
    };

    console.log(props);
    
    useEffect(() => {
        setLoading(true)
        let buildingId = props.match.params.id
        const dataUrl = 'http://localhost:8000'

        fetch(dataUrl + '/buildings')
            .then(res => res.json())
            .then(data => {
                data = data.filter(item => item.buildingId === buildingId)
                if (data.length) data = data[0]
                setBuilding(data)
                setLoading(false)
            })
    }, [props.match.params.id])

    useEffect(() => {
        import('../images/floor'+floor+'.jpg').then(image => {
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
                        Selection grid todo
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
                                        FLOOR
                                    </Typography>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        Floor {floor}
                                    </Typography>
                                    
                                    <Typography variant="h6" className={classes.bookingHeader}>
                                        DATE
                                    </Typography>
                                    <Typography variant="overline" display="block" gutterBottom>
                                        {date.getDate()} / {date.getMonth()+1} / {date.getFullYear()}
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
                                                label="Could not fetch Building data"
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