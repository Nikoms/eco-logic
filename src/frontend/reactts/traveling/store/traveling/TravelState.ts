import { CarViewModel, FlightViewModel } from '../../../../interface-adapter/Traveling/ViewModel';

export interface TravelState {
  cars: CarViewModel[];
  flights: FlightViewModel[];
}
