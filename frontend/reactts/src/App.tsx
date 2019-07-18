import * as React from 'react';
import { render } from 'react-dom';
import { water } from './di';
import { BottomNavigation, Theme } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import HomeIcon from '@material-ui/icons/Home';
import { WaterFactory } from '@eco/frontend-interface-adapter/src/Water/WaterFactory';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Home from './water/views/Home';
import Box from '@material-ui/core/Box';
import { BrowserRouter, LinkProps, NavLink, Route } from 'react-router-dom';

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
// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <NavLink innerRef={ref as any} {...props} />
));

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
            <div>
              <Route path="/" exact render={(props: any) => (<div>Welcome!</div>)}/>
              <Route path="/water" exact render={(props: any) => <Home {...props} waterFactory={water}/>}/>
            </div>
          </Box>
          <BottomNavigation
            className={this.props.classes.stickToBottom}
            value={this.state.value}
            onChange={(event, newValue) => this.setState({ value: newValue })}
            showLabels
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={AdapterLink} to="/" value="/"/>
            <BottomNavigationAction label="Water" icon={<LocalDrinkIcon/>} component={AdapterLink} to="/water"
                                    value="/water"/>
          </BottomNavigation>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App waterFactory={water}/>, document.getElementById('main'));
