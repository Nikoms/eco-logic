import * as React from 'react';
import { render } from 'react-dom';
import { water } from './di';
import { BottomNavigation, Theme } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Home from './water/views/Home';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(9),
    },
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
  };
};

@withStyles(styles)
class App extends React.Component<{ waterFactory: WaterFactory }> {
  state: any = { value: 0 };

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">ECOLOGIC</Typography>
          </Toolbar>
        </AppBar>
        <Box className={this.props.classes.main}>
          <Home waterFactory={water}/>
        </Box>
        <BottomNavigation
          className={this.props.classes.stickToBottom}
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setState({ value: newValue });
          }}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon/>}/>
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>}/>
        </BottomNavigation>
      </div>
    );
  }
}

render(<App waterFactory={water}/>, document.getElementById('main'));
