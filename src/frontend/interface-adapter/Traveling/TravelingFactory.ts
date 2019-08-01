import { EventDispatcher } from '@eco/shared-kernel';
import {
  AddCar,
  AddFlight,
  CarRepositoryInterface,
  FlightRepositoryInterface,
  GetCars,
  GetFlights,
  UpdateOdometer,
} from '@eco/domain';
import { TravelingUI } from './TravelingUI';
import { TravelingController } from './TravelingController';
import { TravelingUIPresenter } from './TravelingUIPresenter';

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
