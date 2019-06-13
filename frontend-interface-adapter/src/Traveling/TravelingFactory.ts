import { RefreshFlights } from '@eco/domain/src/Traveling/UseCase/RefreshFlights';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/Traveling/UseCase/Home/HomePresenterInterface';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { CarFakeApiRepository } from 'frontend/src/infrastructure/Traveling/CarFakeApiRepository';
import { FlightFakeApiRepository } from 'frontend/src/infrastructure/Traveling/FlightFakeApiRepository';
import { OdometerFakeApiRepository } from 'frontend/src/infrastructure/Traveling/OdometerFakeApiRepository';
import { api } from 'frontend/src/infrastructure/Api';
import { TravelingController } from '@eco/frontend-interface-adapter/src/Traveling/TravelingController';
import { TravelingPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingPresenter';

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
        this.addCarPresenter,
        this.addFlightPresenter,
        this.homePresenter,
        this.updateOdometerPresenter,
        new AddCar(new CarFakeApiRepository(api)),
        new AddFlight(new FlightFakeApiRepository(api)),
        new GetCars(new CarFakeApiRepository(api)),
        new RefreshFlights(new FlightFakeApiRepository(api)),
        new UpdateOdometer(new OdometerFakeApiRepository(api)),
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
