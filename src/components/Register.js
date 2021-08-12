import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from '../images/db_logo1.png';
import useLoginStyles from '../styles/loginStyles'
import LandingPage from './LandingPage';
import useGlobalStyles from '../styles/global';
import { useFormik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useState } from 'react';

const Register = () => {
    const classes = useLoginStyles();
    const globalStyles = useGlobalStyles();

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        dbEmpId: '',
        password: '',
    }
    const onSubmit = (values) => {
        setOpen(true)
        console.log(JSON.stringify(values, null, 2));
    
        setTimeout(() => setOpen(false), 2000)
    }
    const formik = useFormik({initialValues, onSubmit})
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false)

    return ( 
        <LandingPage>
            <div className={classes.paper}>
                <img src={logo} alt="logo" height={75} width={75} className={classes.logo} />
                <Typography component="h1" variant="h5">
                    SIGN UP
                </Typography>
                to dbSocialDesk
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        //autoFocus
                        {...formik.getFieldProps('firstName')}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        {...formik.getFieldProps('lastName')}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="dbEmpId"
                        label="DB Employee ID"
                        name="dbEmpId"
                        autoComplete="dbEmpId"
                        {...formik.getFieldProps('dbEmpId')}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        {...formik.getFieldProps('email')}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...formik.getFieldProps('password')}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                    <Link to="/signin" className={globalStyles.primary}>
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Backdrop className={globalStyles.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </LandingPage>
     );
}
 
export default Register;