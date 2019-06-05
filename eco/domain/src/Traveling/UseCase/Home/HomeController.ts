import { RefreshCars } from '@eco/domain/src/Traveling/UseCase/RefreshCars';
import { RefreshFlights } from '@eco/domain/src/Traveling/UseCase/RefreshFlights';

export class HomeController {
  constructor(private refreshCars: RefreshCars, private refreshFlights: RefreshFlights) {
  }

  initList() {
    this.refreshCars.execute();
    this.refreshFlights.execute();
  }
}
