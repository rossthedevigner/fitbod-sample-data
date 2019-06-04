import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { Link as RouterLink, Route, withRouter } from 'react-router-dom';

import { useAuth } from '../auth/provider';
import { getAllUserWorkoutsData } from '../auth/client';
import { Navbar } from './Navbar';
import { WorkoutList } from './WorkoutsList';
import Chart from './Chart';

const drawerWidth = 240;

function ExerciseData({ ...props }) {
  const { workouts, classes, useStyles = useStyles() } = props;

  useEffect(() => {}, []);

  return (
    <Route
      exact
      path={`/profile/:userID/workout/:workoutID/:exercise`}
      render={() => (
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Grid
                container
                className={classes.demo}
                justify="center"
                spacing={2}>
                {/* {Object.keys(workouts).map((value) => {
                  return (
                    <Link
                      component={RouterLink}
                      to={`${props.match.url}/workout/${workouts[value].id}`}>
                      <Grid key={value} item>
                        <Paper className={classes.paper}>
                          {new Date(
                            workouts[value].workout_date
                          ).toLocaleDateString()}
                        </Paper>
                      </Grid>
                    </Link>
                  );
                })} */}
              </Grid>
            </Grid>

            {/* <Grid item xs={12} md={4} lg={3}>
    <Paper className={fixedHeightPaper} />
  </Grid> */}
          </Grid>
        </Container>
      )}
    />
  );
}

export { ExerciseData };
