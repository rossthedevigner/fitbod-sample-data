import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { AuthProvider } from './auth/provider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
