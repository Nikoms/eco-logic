import { GetFlights } from '@eco/domain/src/Traveling/UseCase/GetFlights/GetFlights';
import { AddCar } from '@eco/domain/src/Traveling/UseCase/AddCar/AddCar';
import { AddFlight } from '@eco/domain/src/Traveling/UseCase/AddFlight/AddFlight';
import { UpdateOdometer } from '@eco/domain/src/Traveling/UseCase/UpdateOdometer/UpdateOdometer';
import { GetCars } from '@eco/domain/src/Traveling/UseCase/GetCars/GetCars';
import { EventDispatcher } from '@eco/shared-kernel/src/event/EventDispatcher';
import { TravelingUI } from '@eco/frontend-interface-adapter/src/Traveling/TravelingUI';
import { TravelingUIPresenter } from '@eco/frontend-interface-adapter/src/Traveling/TravelingUIPresenter';
import { TravelingController } from '@eco/frontend-interface-adapter/src/Traveling/TravelingController';
import { CarRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/CarRepositoryInterface';
import { FlightRepositoryInterface } from '@eco/domain/src/Traveling/UseCase/FlightRepositoryInterface';

export class TravelingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventDispatcher,
              private carRepository: CarRepositoryInterface,
              private flightRepository: FlightRepositoryInterface) {
  }

  get viewModel() {
    return this.presenter.viewModel;
  }

  get ui(): TravelingUI {
    return this.presenter;
  }

  get controller() {
    return this.reuseOrInstantiate(
      'TravelingController',
      () => new TravelingController(
        this.presenter,
        this.presenter,
        this.presenter,
        this.presenter,
        this.presenter,
        new AddCar(this.carRepository),
        new AddFlight(this.flightRepository, this.eventDispatcher),
        new GetCars(this.carRepository),
        new GetFlights(this.flightRepository),
        new UpdateOdometer(this.carRepository, this.eventDispatcher),
      ),
    );
  }

  get presenter() {
    return this.reuseOrInstantiate(
      'TravelingPresenter',
      () => new TravelingUIPresenter(),
    );
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
