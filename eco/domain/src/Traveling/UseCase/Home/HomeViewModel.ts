import { Car } from '@eco/domain/src/Traveling/Entity/Car';
import { PlaneTravel } from '@eco/domain/src/Traveling/Entity/PlaneTravel';

export class HomeViewModel { // TODO: Move me in presentation... + Do not call it HomeView :)
  carsTitle = 'Cars';
  cars: Car[] = []; // { id: string, name: string, km: string }[] = [];

  flightTitle = 'Flights';
  flights: PlaneTravel[] = []; // { date: string, description: string, km: string }[] = [];
}
