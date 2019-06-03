import { RefreshCars } from '@/domain/Traveling/UseCase/RefreshCars';
import { RefreshFlights } from '@/domain/Traveling/UseCase/RefreshFlights';

export class HomeController {
  constructor(private refreshCars: RefreshCars, private refreshFlights: RefreshFlights) {
  }

  initList() {
    this.refreshCars.execute();
    this.refreshFlights.execute();
  }
}
