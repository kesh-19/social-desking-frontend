import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import logo from '../images/db_logo1.png';
import useGlobalStyles from '../styles/global'
import useLoginStyles from '../styles/loginStyles'
import LandingPage from './LandingPage';
import { useFormik } from 'formik';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

export default function SignIn() {
    const classes = useLoginStyles();
    const globalStyles = useGlobalStyles();

    const initialValues = {
        email: '',
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
                SIGN IN
            </Typography>
            to dbSocialDesk
            <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                //autoFocus
                {...formik.getFieldProps('email')}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...formik.getFieldProps('password')}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                <Link to="/" className={globalStyles.primary}>
                    Forgot password?
                </Link>
                </Grid>
                <Grid item xs>
                <Link to="/register" className={globalStyles.primary}>
                    {"Don't have an account? Sign Up"}
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