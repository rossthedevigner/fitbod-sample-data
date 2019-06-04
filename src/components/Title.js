import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="h5" variant="h5" color="primary">
      {props.children}
    </Typography>
  );
}
