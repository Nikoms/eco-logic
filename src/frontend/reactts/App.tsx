import * as React from 'react';
import { BottomNavigation, Theme } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import PlaceIcon from '@material-ui/icons/Place';
import HomeIcon from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import WaterHome from './water/views/Home';
import Box from '@material-ui/core/Box';
// @ts-ignore
import { BrowserRouter, Route } from 'react-router-dom';
import { AdapterLink } from './shared-kernel/react/AdapterLink';
import TravelingHome from './traveling/views/Home';
import { travelFactory, waterFactory } from '../interface-adapter';

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


// @ts-ignore
@withStyles(styles)
export default class App extends React.Component<any> {
  state: any = { value: window.location.pathname };

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
            <Route path="/" exact render={() => (<div>Welcome!</div>)}/>
            <Route path="/travel" exact
                   render={(props: any) => <TravelingHome {...props} travelingFactory={travelFactory}/>}/>
            <Route path="/water" exact render={(props: any) => <WaterHome {...props} waterFactory={waterFactory}/>}/>
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
