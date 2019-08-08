import { CarViewModel, FlightViewModel, ViewModel } from '../../../../interface-adapter/Traveling/ViewModel';

interface UpdateCarsAction {
  type: typeof ViewModel.events.carsUpdated;
  payload: { cars: CarViewModel[] };
}

interface UpdateFlightsAction {
  type: typeof ViewModel.events.flightsUpdated;
  payload: { flights: FlightViewModel[] };
}


export type TravelActionTypes = UpdateCarsAction | UpdateFlightsAction;
