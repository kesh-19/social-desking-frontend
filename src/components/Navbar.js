import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
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
    color: 'white',
    textDecoration: 'none',
  },
  navbar: {
    backgroundColor: '#0020a9',
  },
  button: {
    color: 'white'
  },
  avatar: {
    color: "#f5f5f5",
    backgroundColor: "#0020a9",
    border: '2px solid white',
    height: theme.spacing(5),
    width: theme.spacing(5),
    margin: theme.spacing(1)
  },
  logoutBox: {
    textDecoration: 'none', 
  },
  logout: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: 'white'
    }
  }
}));

const Navbar = () => {
    const classes = useStyles();
    let { url } = useRouteMatch();
    let user = {
      fname: 'Shreyas',
      lname: 'Kelshikar'
    }

    const [menuOpen, setMenuOpen] = React.useState(null);

    const handleClick = (event) => {
      setMenuOpen(event.currentTarget);
    };

    const handleClose = () => {
      setMenuOpen(null);
    };

    return ( 
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.navbar}>
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/index">
                      <div className={classes.title}>
                        <p>dbSocialDesk</p>
                      </div>
                    </Link>
                </Typography>
                <Link to={`${url}/bookings`}>
                  <Button className={classes.button}>My Bookings</Button>
                </Link>
                
                <Button size="small" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                  <Avatar variant="rounded" className={classes.avatar}>
                    {user.fname.substring(0,1)}{user.lname.substring(0,1)}
                  </Avatar>
                </Button>
                <Menu
                  id="menu"
                  anchorEl={menuOpen}
                  keepMounted
                  open={Boolean(menuOpen)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>Signed in as<br/>{user.fname} {user.lname}</MenuItem>
                  <Link to="/" className={classes.logoutBox}>
                    <MenuItem onClick={handleClose} className={classes.logout}>Logout</MenuItem>
                  </Link>
                </Menu>
                </Toolbar>
            </AppBar>
        </div>
     );
}
 
export default Navbar;