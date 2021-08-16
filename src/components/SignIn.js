import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import logo from '../images/db_logo1.png';
import useLoginStyles from '../styles/loginStyles'
import LandingPage from './LandingPage';
import { useFormik } from 'formik';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';
import Config from '../Config'
import axios from 'axios'
import ErrorIcon from '@material-ui/icons/Error';
import Chip from '@material-ui/core/Chip';


export default function SignIn() {
    const classes = useLoginStyles();
    let history = useHistory()

    const initialValues = {
        email: ''
    }
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    

    if (window.localStorage.getItem('user')) {
        history.push('/index')
    }

    const onSubmit = (values) => {
        setOpen(true)
        console.log(JSON.stringify(values, null, 2));

        let user = null

        axios.post(Config.serverUrl + '/desking/signin', values)
          .then(function (response) {
              user = response.data
              
              if (user) {
                setError(false)
                window.localStorage.setItem('user', JSON.stringify(user))
                history.push({
                    pathname: '/index',
                    byLogin: true
                })
              } else {
                setError("No user found")
              }
              setOpen(false)
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const formik = useFormik({initialValues, onSubmit})

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
        {
            error && !open && 
                <Chip
                    icon={<ErrorIcon />}
                    label="User not found!"
                    color="secondary"
                    style={{ marginTop: '1rem' }}
                />
        }
        </div>
        user1gmail.com
        shreyas@gmail.com
    </LandingPage>
  );
}