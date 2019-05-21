import { TravelingPresenter } from '@/app/traveling/TravelingPresenter';
import { RefreshFlights } from '@/domain/Traveling/RefreshFlights';
import { RefreshCars } from '@/domain/Traveling/RefreshCars';
import { HomeController } from '@/domain/Traveling/UseCase/Home/HomeController';

export class TravelingFactory {
  private instances: any = {};

  constructor() {
  }

  get travelingHomePresenter() {
    if (this.instances[TravelingPresenter.name] === undefined) {
      this.instances[TravelingPresenter.name] = new TravelingPresenter();
    }
    return this.instances[TravelingPresenter.name];
  }

  get travelingHomeController(): HomeController {
    if (this.instances[HomeController.name] === undefined) {
      this.instances[HomeController.name] = new HomeController(
        new RefreshCars(this.travelingHomePresenter),
        new RefreshFlights(this.travelingHomePresenter),
      );
    }
    return this.instances[HomeController.name];
  }
}
