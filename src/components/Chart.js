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
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Title from './Title';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer
} from 'recharts';

function Chart({ ...props }) {
  console.log(props);
  const { sets, classes } = props;
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(sets.allReps);
  }, [sets]);

  const addTickSuffix = (num) => `${num} lbs`;

  return (
    <>
      <Grid item xs={12} sm container style={{ color: 'white' }}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">One Rep Max</Typography>
            <Typography
              variant="subtitle2"
              className={classes.listItemSub}
              gutterBottom>
              Theoretical Upper Limit
            </Typography>
          </Grid>
        </Grid>
        {chartData && chartData.length && (
          <Grid item>
            <Box variant="subtitle3" align="right">
              <Typography variant="h6">
                {Object.values(chartData[chartData.length - 1])[2]}
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.listItemSub}
                align="right">
                lbs
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ec183" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#4ec183" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0 0" color="#4ec183" opacity={0.3} />
          <XAxis dataKey="date" dy={4} dx={-2} />
          <YAxis
            tickFormatter={addTickSuffix}
            domain={['auto', 'dataMax+5']}
            dy={-2}>
            <Label
              angle={270}
              type="number"
              position="left"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>

          <Area
            type="monotone"
            dataKey="weight"
            stroke="#4ec183"
            strokeWidth="3"
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
