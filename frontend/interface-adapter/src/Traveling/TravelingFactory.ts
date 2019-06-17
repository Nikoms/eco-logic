import { GetFlights } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlights';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { AddCarPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCarPresenterInterface';
import { AddFlightPresenterInterface } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlightPresenterInterface';
import { UpdateOdometerPresenterInterface } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometerPresenterInterface';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { TravelingPresenter } from './TravelingPresenter';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { FlightFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/FlightFakeApiRepository';
import { CarFakeApiRepository } from '@eco/frontend-infrastructure/src/Traveling/CarFakeApiRepository';
import { TravelingController } from './TravelingController';
import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';
import { GetFlightsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlightsPresenterInterface';
import { GetCarsPresenterInterface } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCarsPresenterInterface';
import { TravelingUI } from '@eco/frontend-interface-adapter/src/Traveling/TravelingUI';
import { CarLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/CarLocalStorageRepository2';

export class TravelingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventDispatcher) {

  }

  get getCarsPresenter(): GetCarsPresenterInterface {
    return this.travelPresenter;
  }

  get addCarPresenter(): AddCarPresenterInterface {
    return this.travelPresenter;
  }

  get addFlightPresenter(): AddFlightPresenterInterface {
    return this.travelPresenter;
  }

  get getFlightsPresenter(): GetFlightsPresenterInterface {
    return this.travelPresenter;
  }

  get updateOdometerPresenter(): UpdateOdometerPresenterInterface {
    return this.travelPresenter;
  }

  get ui(): TravelingUI {
    return this.travelPresenter;
  }

  get controller() {
    const enAttendant = new CarLocalStorageRepository2(window.localStorage);
    return this.reuseOrInstantiate(
      'TravelingController',
      () => new TravelingController(
        this.addCarPresenter,
        this.addFlightPresenter,
        this.getFlightsPresenter,
        this.getCarsPresenter,
        this.updateOdometerPresenter,
        new AddCar(new CarFakeApiRepository(api, enAttendant)),
        new AddFlight(new FlightFakeApiRepository(api), this.eventDispatcher),
        new GetCars(new CarFakeApiRepository(api, enAttendant)),
        new GetFlights(new FlightFakeApiRepository(api)),
        new UpdateOdometer(new CarFakeApiRepository(api, enAttendant), this.eventDispatcher),
      ),
    );
  }

  private get travelPresenter() {
    return this.reuseOrInstantiate(
      'TravelingPresenter',
      () => new TravelingPresenter(),
    );
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
