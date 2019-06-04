import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import fitbodLogo from '../assets/fitbod-logo-white.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: '#242a2e'
    }
  },
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
    '& label': {
      color: 'white'
    },
    '& input': {
      color: 'white'
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#ff6e60'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255, 0.2)',
      '&:hover ': {
        fieldset: {
          color: 'white'
        }
      }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      color: '#ff6e60',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff6e60'
      }
    }
  },

  input: {
    backgroundColor: theme.palette.common.white
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ff6e60',
    color: 'white',
    '&:hover': {
      color: 'black'
    }
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

function Login({ login, ...props }) {
  const classes = useStyles();
  const [isRejected, setIsRejected] = useState([]);
  const [isError, setError] = useState([]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { username, password } = evt.target.elements;
    setIsRejected(false);
    setError(false);

    login({
      username: username.value,
      password: password.value
    })
      .then(() => {
        return props.setAuthenticated(true);
      })

      .catch((e) => {
        setError(e);
        setIsRejected(true);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box component="span" m={1} className={classes.fitbodLogo}>
          <img src={fitbodLogo} alt="Logo" />
        </Box>

        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}>
            Sign In
          </Button>
        </form>
        {isRejected && isError && (
          <Box styles={{ color: 'red' }}>
            <Typography variant="body2" color="error">
              {isError.message}
            </Typography>
          </Box>
        )}
      </div>
    </Container>
  );
}

export { Login };
