import { RefreshFlights } from '@eco/domain/src/Traveling/UseCase/RefreshFlights';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { TravelingPresenter } from '@eco/domain/src/Traveling/TravelingPresenter';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { TravelingController } from '@eco/domain/src/Traveling/TravelingController';

export class TravelingFactory {
  private instances: any = {};

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

  get controller() {
    return this.reuseOrInstantiate(
      TravelingController.name,
      () => new TravelingController(
        new AddCar(this.addCarPresenter),
        new AddFlight(this.addFlightPresenter),
        new GetCars(this.homePresenter),
        new RefreshFlights(this.homePresenter),
        new UpdateOdometer(this.updateOdometerPresenter),
      ),
    );
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
