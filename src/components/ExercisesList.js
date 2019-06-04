import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import fitbodLogo from '../assets/fitbod-logo-white.png';

function ExerciseList({ ...props }) {
  const { exercises, classes, useStyles = useStyles() } = props;
  const [loggedExerciseList, setLoggedExerciseList] = useState([]);

  useEffect(() => {
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
        <Typography className={classes.drawerTitle}>Your Exercises</Typography>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon className={classes.iconPrimary} />
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
                  key={idx}
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
                            component="span"
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
                            component="span"
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
