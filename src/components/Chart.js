import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
