import { TravelingPresenter } from '@/app/traveling/TravelingPresenter';
import { RefreshFlights } from '@/domain/Traveling/RefreshFlights';
import { RefreshCars } from '@/domain/Traveling/RefreshCars';
import { HomeController } from '@/domain/Traveling/UseCase/Home/HomeController';
import { AddCar } from '@/domain/Traveling/UseCase/AddCar/AddCar';
import { AddCarController } from '@/domain/Traveling/UseCase/AddCar/AddCarController';
import { AddFlight } from '@/domain/Traveling/UseCase/AddFlight/AddFlight';
import { AddFlightController } from '@/domain/Traveling/UseCase/AddFlight/AddFlightController';
import { UpdateOdometerController } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerController';
import { UpdateOdometer } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddCarPresenterInterface } from '@/domain/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@/domain/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { UpdateOdometerPresenterInterface } from '@/domain/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { HomePresenterInterface } from '@/domain/Traveling/UseCase/Home/HomePresenterInterface';

export class TravelingFactory {
  private instances: any = {};

  constructor() {
  }

  get homePresenter(): HomePresenterInterface {
    return this.reuseOrInstantiate(
      TravelingPresenter.name,
      () => new TravelingPresenter(),
    );
  }

  get addCarPresenter(): AddCarPresenterInterface {
    return this.reuseOrInstantiate(
      TravelingPresenter.name,
      () => new TravelingPresenter(),
    );
  }

  get addFlightPresenter(): AddFlightPresenterInterface {
    return this.reuseOrInstantiate(
      TravelingPresenter.name,
      () => new TravelingPresenter(),
    );
  }

  get updateOdometerPresenter(): UpdateOdometerPresenterInterface {
    return this.reuseOrInstantiate(
      TravelingPresenter.name,
      () => new TravelingPresenter(),
    );
  }

  get HomeController() {
    return this.reuseOrInstantiate(
      HomeController.name,
      () => new HomeController(
        new RefreshCars(this.homePresenter),
        new RefreshFlights(this.homePresenter),
      ),
    );
  }

  get addCarController() {
    return this.reuseOrInstantiate(
      AddCarController.name,
      () => new AddCarController(new AddCar(this.addCarPresenter)),
    );
  }

  get addFlightController() {
    return this.reuseOrInstantiate(
      AddFlightController.name,
      () => new AddFlightController(new AddFlight(this.addFlightPresenter)),
    );
  }

  get updateOdometerController() {
    return this.reuseOrInstantiate(
      AddFlightController.name,
      () => new UpdateOdometerController(new UpdateOdometer(this.updateOdometerPresenter)),
    );

  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
