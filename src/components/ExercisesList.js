import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
import Box from '@material-ui/core/Box';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import fitbodLogo from '../assets/fitbod-logo-white.png';

function ExerciseList({ ...props }) {
  console.log(props);
  const { exercises, classes, useStyles = useStyles() } = props;
  const [loggedExerciseList, setLoggedExerciseList] = useState([]);

  useEffect(() => {
    console.log(exercises);
    if (exercises.length) {
      setLoggedExerciseList(exercises);
    }
  }, [exercises]);

  return (
    <Drawer
      variant="persistent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.drawerOpen && classes.drawerPaperClose
        ),
        docked: classes.drawerPaperDock
      }}
      open={props.drawerOpen}>
      <div className={classes.toolbarIcon}>
        <Typography className={classes.titles}>Your Exercises</Typography>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      <List>
        <>
          {Object.keys(loggedExerciseList).map((ex, idx) => {
            const loggedEx = loggedExerciseList[ex];
            if (loggedEx.totalSets) {
              return (
                <Link
                  component={RouterLink}
                  to={`${props.match.url}/exercise/${loggedEx.id}`}
                  underline={'none'}>
                  <ListItem className={classes.listButton}>
                    <ListItemText
                      className={classes.listItem}
                      primary={loggedEx.name}
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            className={classes.listItemSub}
                            color="textPrimary">
                            1 RM Record
                          </Typography>
                        </>
                      }
                    />
                    <ListItemText
                      className={classes.listItem}
                      primary={loggedEx.allReps.slice(-1)[0].weight}
                      secondary={
                        <>
                          <Typography
                            align="right"
                            variant="body2"
                            className={classes.listItemSub}
                            color="textPrimary">
                            lbs
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Link>
              );
            }
          })}
        </>
      </List>
      <Divider />
      <Box component="span" m={1} className={classes.fitbodLogo}>
        <img src={fitbodLogo} alt="Logo" />
      </Box>
      <List />
    </Drawer>
  );
}

export default withRouter(ExerciseList);
