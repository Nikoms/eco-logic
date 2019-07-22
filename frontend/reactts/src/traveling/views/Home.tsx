import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, Theme } from '@material-ui/core';
import { NonFunctionProperties } from '../../shared-kernel/type/NonFunctionProperties';
import { TravelingFactory } from '@eco/frontend-interface-adapter/src/Traveling/TravelingFactory';
import { ViewModel } from '@eco/frontend-interface-adapter/src/Traveling/ViewModel';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import AddCarView from '../compononents/AddCarView';
import AddFlightView from '../compononents/AddFlightView';

const styles = (theme: Theme) => {
  return {
    fab: {
      position: 'fixed',
      bottom: theme.spacing(9),
      right: theme.spacing(2),
    },
  };
};

interface HomeProps {
  travelingFactory: TravelingFactory;
}

@withStyles(styles)
export default class Home extends React.Component<HomeProps> {
  state: NonFunctionProperties<ViewModel> = { ...new ViewModel() };

  constructor(props: HomeProps) {
    super(props);
    this.props.travelingFactory.viewModel
      .onChange((viewModel, path: 'updateOdometerView' | 'addCarView' | 'addFlightView' | null, newValues) => {
        if (path === null) {
          this.setState({ ...newValues });
        } else {
          const values = { ...this.state[path], ...newValues };
          this.setState({ path: values });
        }
      });
    this.props.travelingFactory.controller.refreshSummary();
  }

  render() {
    return (<div>
      <AddCarView presenter={this.props.travelingFactory.presenter}
                  viewModel={this.props.travelingFactory.viewModel}
                  controller={this.props.travelingFactory.controller}/>
      <AddFlightView presenter={this.props.travelingFactory.presenter}
                     viewModel={this.props.travelingFactory.viewModel}
                     controller={this.props.travelingFactory.controller}/>
      <Card>
        <CardHeader
          title={this.state.carsTitle}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          action={<AddIcon onClick={() => this.props.travelingFactory.ui.showAddCar()}/>}
        />
      </Card>

      {this.state.cars.map((car) =>
        <Card key={car.id}>
          <CardHeader title={car.name + ' -> ' + car.distance}
                      onClick={() => this.props.travelingFactory.ui.showUpdateOdometer(car)}/>
        </Card>)}

      <Card>
        <CardHeader
          title={this.state.flightTitle}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          action={<AddIcon onClick={() => this.props.travelingFactory.ui.showAddFlight()}/>}
        />
      </Card>

      {this.state.flights.map((flight, i) => <Card key={'flight' + i}><CardHeader
        title={flight.distance + ' -> ' + flight.date}/></Card>)}

    </div>);
  }
}
