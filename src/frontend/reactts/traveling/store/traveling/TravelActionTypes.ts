import { CarViewModel, FlightViewModel } from '../../../../interface-adapter/Traveling/ViewModel';

export const UPDATE_CARS = 'travel.updateCars';
export const UPDATE_FLIGHTS = 'travel.updateFlights';

interface UpdateCarsAction {
  type: typeof UPDATE_CARS;
  payload: { cars: CarViewModel[] };
}

interface UpdateFlightsAction {
  type: typeof UPDATE_FLIGHTS;
  payload: { flights: FlightViewModel[] };
}

export type TravelActionTypes = UpdateCarsAction | UpdateFlightsAction;
