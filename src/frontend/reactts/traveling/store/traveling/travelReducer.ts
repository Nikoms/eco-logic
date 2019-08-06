import { TravelActionTypes, UPDATE_CARS, UPDATE_FLIGHTS } from './TravelActionTypes';
import { TravelState } from './TravelState';

const initialState: TravelState = {
  cars: [],
  flights: [],
};

export function travelReducer(state = initialState, action: TravelActionTypes): TravelState {
  switch (action.type) {
    case UPDATE_CARS:
      return {
        ...state,
        cars: action.payload.cars,
      };
    case UPDATE_FLIGHTS:
      return {
        ...state,
        flights: action.payload.flights,
      };
  }

  return state;
}
