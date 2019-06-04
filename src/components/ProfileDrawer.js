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
import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard';

function ProfileDrawer({ ...props }) {

    const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const [ url, setURL ] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  

  const [exercises, setExercises] = useState({ exercises: [] });
  const [currentWorkout, setCurrentWorkout] = useState({});
  const handleNewWorkout = (workouts) => setCurrentWorkout(workouts);
  const [currentExercise, setCurrentExercise] = useState({});

    return (
    
<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            { currentExercise.name }
          </Typography>
        </Toolbar>
      </AppBar>

<Drawer
variant="permanent"
classes={{
  paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
}}
open={open}
>
<div className={classes.toolbarIcon}>
  <IconButton onClick={ handleDrawerClose }>
    <ChevronLeftIcon />
  </IconButton>
</div>
<Divider />
<List>
  <>
  {/* 
    // list out the exercises
  */}

  { 
    Object.keys(currentExercise).map((ex, idx) => {
      console.log(currentExercise[ex])

    })
  }


  { 
    Object.keys(currentWorkout).map((workout, idx) => {

      if (currentWorkout[workout].totalSets) {
        return (
          <Link component={ RouterLink } to={ `/profile/${props.user.id}/workouts/${currentWorkout[workout].totalSets[0].workout_id}/exercise/${currentWorkout[workout].id}` }>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={ currentWorkout[workout].name } />
            </ListItem>
          </Link>
        )
      }
    })
  }
  </>
</List>
<Divider />
<List></List>
</Drawer>

    )}

export { ProfileDrawer }