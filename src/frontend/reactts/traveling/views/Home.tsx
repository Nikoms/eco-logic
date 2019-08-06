import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, Theme } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import AddIcon from '@material-ui/icons/Add';
import AddCarView from '../compononents/AddCarView';
import AddFlightView from '../compononents/AddFlightView';
import UpdateOdometerView from '../compononents/UpdateOdometerView';
import { TravelingFactory } from '../../../interface-adapter';
import { connect } from 'react-redux';
import { AppState } from '../../rootReducer';
import { TravelState } from '../store/traveling/TravelState';

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
  travel: TravelState;
}

// @ts-ignore
@withStyles(styles)
class Home extends React.Component<HomeProps> {
  componentDidMount() {
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
      <UpdateOdometerView presenter={this.props.travelingFactory.presenter}
                          viewModel={this.props.travelingFactory.viewModel}
                          controller={this.props.travelingFactory.controller}
      />

      <Card>
        <CardHeader
          title={this.props.travelingFactory.viewModel.carsTitle}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          action={<AddIcon onClick={() => this.props.travelingFactory.ui.showAddCar()}/>}
        />
      </Card>

      {this.props.travel.cars.map((car) =>
        <Card key={car.id}>
          <CardHeader title={car.name + ' -> ' + car.distance}
                      onClick={() => this.props.travelingFactory.ui.showUpdateOdometer(car)}/>
        </Card>)}

      <Card>
        <CardHeader
          title={this.props.travelingFactory.viewModel.flightTitle}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          action={<AddIcon onClick={() => this.props.travelingFactory.ui.showAddFlight()}/>}
        />
      </Card>

      {this.props.travel.flights.map((flight, i) => <Card key={'flight' + i}><CardHeader
        title={flight.distance + ' -> ' + flight.date + ' : ' + flight.description}/></Card>)}

    </div>);
  }
}

const mapStateToProps = (state: AppState) => ({
  travel: state.travel,
});

export default connect(mapStateToProps)(Home);


