import { RefreshCars } from '@/domain/Traveling/RefreshCars';
import { RefreshFlights } from '@/domain/Traveling/RefreshFlights';

export class HomeController {
  constructor(private refreshCars: RefreshCars, private refreshFlights: RefreshFlights) {
  }

  refreshAll() {
    this.refreshCars.execute();
    this.refreshFlights.execute();
  }
}
