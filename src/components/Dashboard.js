import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, Route, withRouter } from 'react-router-dom';

import { getAllUserWorkoutsData } from '../auth/client';
import ExerciseList from './ExercisesList';
import Chart from './Chart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    fontFamily: 'Roboto'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ff6e60',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  titles: {
    textAlign: 'center',
    paddingLeft: 18,
    textTransform: 'uppercase',
    color: 'darkGrey',
    width: '100%',
    fontSize: '0.825rem'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: '#353533',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    },
    // marginLeft: -drawerWidth,
    backgroundColor: '#353533'
  },
  drawerPaperDock: { backgroundColor: '#242a2e' },
  listItem: {
    fontWeight: 'bold',
    color: 'white',
    flex: '0 0 auto',
    fontSize: '0.825rem'
  },
  listItemSub: {
    color: 'darkGrey',
    fontSize: '0.8rem'
  },
  listButton: {
    borderBottom: '1px solid rgba(255,255,255, 0.2)',
    paddingBottom: 10,
    justifyContent: 'space-between',
    '&:hover': {
      textDecoration: 'underline',
      color: 'white'
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#242a2e'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 400
  },
  fitbodLogo: {
    width: '100%',
    position: 'relative',
    bottom: 0,
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& img': {
      width: 140,
      maxWidth: '100%'
    }
  }
}));

const getDateString = (date) => {
  const cleanDate = date.slice(0, 7);
  return new Date(cleanDate).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric'
  });
};

const getOneRepMax = (weight, reps) => {
  return Number((weight * (36 / (37 - reps))).toFixed(2));
};

const handleChartData = (data) => {
  // we can speed this up
  let monthToMonthData = data.reduce((acc, curr, idx) => {
    const date = getDateString(curr.performed_at);
    acc[date] = acc[date] || [];
    acc[date].push(curr);
    return acc;
  }, []);

  return Object.values(monthToMonthData).map((exercise, idx) => {
    const { exercise_id, totalReps, totalWeight, date, name } = exercise.reduce(
      (acc, curr, idx, arr) => {
        const { performed_at: date, exercise_id } = curr;
        return {
          totalReps: acc.totalReps ? acc.totalReps + curr.reps : curr.reps,
          totalWeight: acc.totalWeight
            ? acc.totalWeight + curr.weight
            : curr.weight,
          date: getDateString(date),
          exercise_id,
          name
        };
      }
    );

    return {
      exercise_id,
      date,
      weight: getOneRepMax(
        totalWeight / exercise.length,
        totalReps / exercise.length
      )
    };
  });
};

function Dashboard({ ...props }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [url, setURL] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [allWorkouts, setAllWorkouts] = useState([]);
  const [allExercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState([]);
  const [allOneRepMax, setAllOneRepMax] = useState([]);
  const [currentExerciseTitle, setCurrentExerciseTitle] = useState([]);

  const handleSetCurrentExercise = (ex) => {
    if (!ex) {
      return;
    }
    setOpen(true);

    console.log(ex);
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
      .map((ex) => [ex, handleChartData(ex.totalSets)])
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
