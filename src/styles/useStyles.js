import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
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
  iconPrimary: {
    color: 'white'
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
    marginRight: 6
  },
  menuButtonHidden: {
    display: 'none'
  },
  drawerTitle: {
    textAlign: 'center',
    paddingLeft: 40,
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
    marginLeft: -drawerWidth,
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
    fontSize: '0.8rem',
    display: 'block'
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
