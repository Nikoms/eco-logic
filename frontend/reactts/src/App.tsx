import * as React from 'react';
import { render } from 'react-dom';
import { travel, water } from './di';
import { BottomNavigation, Theme } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PlaceIcon from '@material-ui/icons/Place';
import HomeIcon from '@material-ui/icons/Home';
import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import WaterHome from './water/views/Home';
import Box from '@material-ui/core/Box';
import { BrowserRouter, Route } from 'react-router-dom';
import { AdapterLink } from './shared-kernel/react/AdapterLink';
import TravelingHome from './traveling/views/Home';

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
  state: any = { value: location.pathname };

  render() {
    return (
      <BrowserRouter>
        <div className={this.props.classes.root}>

          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">ECOLOGIC</Typography>
            </Toolbar>
          </AppBar>
          <Box className={this.props.classes.main}>
            <Route path="/" exact render={(props: any) => (<div>Welcome!</div>)}/>
            <Route path="/travel" exact
                   render={(props: any) => <TravelingHome {...props} travelingFactory={travel}/>}/>
            <Route path="/water" exact render={(props: any) => <WaterHome {...props} waterFactory={water}/>}/>
          </Box>
          <BottomNavigation
            className={this.props.classes.stickToBottom}
            value={this.state.value}
            onChange={(event, newValue) => this.setState({ value: newValue })}
            showLabels
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={AdapterLink} to="/" value="/"/>
            <BottomNavigationAction label="Tavel" icon={<PlaceIcon/>} component={AdapterLink} to="/travel"
                                    value="/travel"/>
            <BottomNavigationAction label="Water" icon={<LocalDrinkIcon/>} component={AdapterLink} to="/water"
                                    value="/water"/>
          </BottomNavigation>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App waterFactory={water}/>, document.getElementById('main'));
