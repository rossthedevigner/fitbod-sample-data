import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import { Link as RouterLink, withRouter } from 'react-router-dom';

function WorkoutList({ ...props }) {
  const { workouts, classes, useStyles = useStyles() } = props;

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container className={classes.demo} justify="center" spacing={2}>
            {Object.keys(workouts).map((value) => {
              return (
                <Link
                  component={RouterLink}
                  to={`${props.match.url}/workout/${workouts[value].id}`}>
                  <Grid key={value} item>
                    <Paper className={classes.paper}>
                      {new Date(workouts[value].workout_date).toDateString()}
                    </Paper>
                  </Grid>
                </Link>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(WorkoutList);
