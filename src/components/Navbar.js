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
  useRouteMatch,
  useLocation
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
  const location = useLocation()
    const checkRoute = () => {
      return location.pathname.includes('/index/admin') || location.pathname.includes('/index/bookings')
    }
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = React.useState(null);
    const [user, setUser] = React.useState({ fName: '', lName: ''});
    let { url } = useRouteMatch();
    let localStorage = window.localStorage
    const userType = JSON.parse(localStorage.getItem('user')).role
    const handleClick = (event) => {
      setMenuOpen(event.currentTarget);
    };

    const handleClose = () => {
      localStorage.removeItem('user')
      localStorage.getItem('user')
    };

    React.useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user')))
    }, [localStorage])

    const checkUserType = () => {
      if(userType === 'admin' || userType === 'Admin')
          return 'admin'
      else if(userType === 'user' || userType === 'User')
          return 'user'
      else if(userType === 'developer' || userType === 'Developer')
          return 'developer'
      else
        return 'user'
    }
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
                <Link to={ checkRoute() ? '/index' : (checkUserType() === 'admin' ? `${url}/admin` : `${url}/bookings`)}>
                  <Button className={classes.button}>{ checkRoute() ? 'Go back' : (checkUserType() === 'admin' ? 'All bookings' : 'My bookings')}</Button>
                </Link>
                
                {
                  user &&
                    <Button size="small" aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                      <Avatar variant="rounded" className={classes.avatar}>
                        {user.fName.substring(0,1)}{user.lName.substring(0,1)}
                      </Avatar>
                    </Button>
                }
                <Menu
                  id="menu"
                  anchorEl={menuOpen}
                  keepMounted
                  open={Boolean(menuOpen)}
                  onClose={() => setMenuOpen(null)}
                >
                  {
                    user && <MenuItem disabled>Signed in as<br/>{user.fName} {user.lName}</MenuItem>
                  }
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