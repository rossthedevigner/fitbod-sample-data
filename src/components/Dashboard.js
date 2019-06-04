import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, withRouter } from 'react-router-dom';

import { getAllUserWorkoutsData } from '../auth/client';
import ExerciseList from './ExercisesList';
import Chart from './Chart';
import { useStyles } from '../styles/useStyles';
import { buildChartData } from '../utils/helpers';

function Dashboard({ ...props }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // const [url, setURL] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [allWorkouts, setAllWorkouts] = useState([]);
  const [currentExercise, setCurrentExercise] = useState([]);
  const [allOneRepMax, setAllOneRepMax] = useState([]);

  const handleSetCurrentExercise = (ex) => {
    if (!ex) {
      return;
    }
    setOpen(true);
    setCurrentExercise(ex);

    // forward to first exercise if necessary
    if (!props.location.pathname.includes('exercise')) {
      let newExercisePath = `${props.location.pathname}/exercise/${ex.id}`;
      return props.history.replace(newExercisePath);
    }
  };

  const setWorkoutsHandler = async () => {
    const { workouts, exercises } = await getAllUserWorkoutsData(props.user);
    const oneRepMaxData = exercises
      .map((ex) => [ex, buildChartData(ex.totalSets)])
      .map(([ex, allReps]) => ({ ...ex, allReps }));

    setAllWorkouts(workouts);
    // setExercises(exercises);
    setAllOneRepMax(oneRepMaxData);
    handleSetCurrentExercise(exercises[0]);
  };

  useEffect(() => {
    const exerciseID = parseInt(props.location.pathname.split('/').pop());

    if (!Object.keys(allWorkouts).length) {
      setWorkoutsHandler();

      props.history.listen((loc, action) => {
        if (!loc.pathname.includes(`/exercise`)) {
          setOpen(false);
          setCurrentExercise([]);
        }
      });
    }

    if (allOneRepMax) {
      handleSetCurrentExercise(
        allOneRepMax.find((ex, idx) => ex.id === exerciseID)
      );
    }
  }, [props.location.pathname]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Route
        path={['/profile/:userID']}
        render={() => (
          <ExerciseList
            useStyles={useStyles}
            classes={classes}
            workouts={allWorkouts}
            exercises={allOneRepMax}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            setCurrentExercise={handleSetCurrentExercise}
            drawerOpen={open}
            {...props}
          />
        )}
      />
      <main className={classes.content}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <>
              {currentExercise && currentExercise.name && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}>
                  <MenuIcon />
                </IconButton>
              )}
            </>
            <Typography
              align="center"
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {currentExercise && currentExercise.name
                ? currentExercise.name
                : 'Loading your workouts...'}
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.appBarSpacer} />

        <Route
          exact
          path={`/profile/:userID/exercise/:exerciseID`}
          render={() => (
            <Grid
              container
              spacing={0}
              direction="row"
              justify="center"
              style={{ minHeight: '100vh', marginTop: 20 }}>
              <Grid item xs={12} md={8} lg={9}>
                <div className={fixedHeightPaper}>
                  <Chart
                    sets={currentExercise}
                    useStyles={useStyles}
                    classes={classes}
                  />
                </div>
              </Grid>
            </Grid>
          )}
        />
      </main>
    </div>
  );
}

export default withRouter(Dashboard);
