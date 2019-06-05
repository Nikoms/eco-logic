export class HomeViewModel {
  carsTitle = 'Cars';
  cars: { id: string, name: string, km: string }[] = [];

  flightTitle = 'Flights';
  flights: { date: string, description: string, km: string }[] = [];
}
