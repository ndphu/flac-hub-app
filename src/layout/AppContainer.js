import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Drawer from "@material-ui/core/Drawer/Drawer";
import navigatorService from '../service/NavigationService';
import {replaceAll} from '../utils/StringUtils';
import AppDrawer from './AppDrawer';
import Paper from '@material-ui/core/Paper/Paper';
import PlayerComponent from '../component/player/PlayerComponent';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InputBase from '@material-ui/core/InputBase/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider/Divider';

const drawerWidth = 240;
const playerSmallHeight = 86;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },

  grow: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginBottom: playerSmallHeight,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 380,
    }
  },

  playerSmall: {
    position: 'fixed',
    height: playerSmallHeight,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar.dense,
  },

  hide: {
    display: 'none',
  },
});

class AppContainer extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false,
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleSearchKeyUp = (e) => {
    e.target.setAttribute('maxlength', 32);
    const query = e.target.value.trim();
    if (e.key === 'Enter') {
      if (query) {
        navigatorService.goToSearch(replaceAll(query, '/', '%2F'));
      }
    } else {
      this.setState({currentQuery: query + e.key});
    }
  };

  render() {
    const {classes, theme} = this.props;

    const drawer = (
      <AppDrawer/>
    );
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}
            variant={'dense'}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
              FLAC Hub
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyUp={this.handleSearchKeyUp}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
          onClose={this.handleDrawerToggle}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {<ChevronLeftIcon/>}
            </IconButton>
          </div>
          <Divider/>
          {drawer}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} style={{height: 48}}/>
          {this.props.children}
        </main>
        <Paper className={classes.playerSmall}
               elevation={12}
               square>
          <PlayerComponent/>
        </Paper>
      </div>
    );
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppContainer);
