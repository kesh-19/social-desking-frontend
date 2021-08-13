import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OfficeCard from './OfficeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} sm={3} md={4}>
          <OfficeCard />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <OfficeCard />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <OfficeCard />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <OfficeCard />
        </Grid>

      </Grid>
    </div>
  );
}
