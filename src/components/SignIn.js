import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from '../images/db_logo1.png';
// import useGlobalStyles from '../styles/global'
import useLoginStyles from '../styles/loginStyles'
import LandingPage from './LandingPage';
import { useFormik } from 'formik';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';

export default function SignIn() {
    const classes = useLoginStyles();
    // const globalStyles = useGlobalStyles();
    let history = useHistory()

    const initialValues = {
        email: ''
    }
    const onSubmit = (values) => {
        setOpen(true)
        console.log(JSON.stringify(values, null, 2));

        
        setTimeout(() => {
            history.push('/index')
        }, 1000)
    }
    const formik = useFormik({initialValues, onSubmit})
    const [open, setOpen] = useState(false);
    // const handleClose = () => setOpen(false)

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
                autoFocus
                {...formik.getFieldProps('email')}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                disabled={open}
            >
                Sign In
            </Button>
            </form>
        { open && <CircularProgress className={classes.progress} />}
        </div>
    </LandingPage>
  );
}