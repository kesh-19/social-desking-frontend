import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import {
  Link,
  useRouteMatch
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#0020a9',
  },
  button: {
    color: 'white'
  }
}));

const Navbar = () => {
    const classes = useStyles();
    let { url } = useRouteMatch();

    return ( 
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    dbSocialDesk
                </Typography>
                <Link to={`${url}/bookings`}>
                  <Button className={classes.button}>My Bookings</Button>
                </Link>
                <Link to="/">
                  <Button className={classes.button}>Logout</Button>
                </Link>
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Navbar;