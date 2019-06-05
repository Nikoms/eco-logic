import { RefreshFlights } from '@eco/domain/src/Traveling/UseCase/RefreshFlights';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';

export class HomeController {
  constructor(private getCars: GetCars, private refreshFlights: RefreshFlights) {
  }

  initList() {
    this.getCars.execute();
    this.refreshFlights.execute();
  }
}
