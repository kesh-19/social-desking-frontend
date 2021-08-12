import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import useLoginStyles from '../styles/loginStyles'
import Grid from '@material-ui/core/Grid';

export default function LandingPage({ children }) {
  const classes = useLoginStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        { children }
      </Grid>
    </Grid>
  );
}