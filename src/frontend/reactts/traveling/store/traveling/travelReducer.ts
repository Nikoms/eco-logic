import { TravelActionTypes } from './TravelActionTypes';
import { TravelState } from './TravelState';
import { ViewModel } from '../../../../interface-adapter/Traveling/ViewModel';

const initialState: TravelState = {
  cars: [],
  flights: [],
};

export function travelReducer(state = initialState, action: TravelActionTypes): TravelState {
  switch (action.type) {
    case ViewModel.events.carsUpdated:
      return { ...state, cars: action.payload.cars };

    case ViewModel.events.flightsUpdated:
      return { ...state, flights: action.payload.flights };
  }

  return state;
}
