import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { HouseHeatingController } from './HouseHeatingController';
import { HouseHeatingUIPresenter } from './HouseHeatingUIPresenter';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/HouseHeating/ElectricUI';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { FuelOilOrderRepositoryInterface } from '@eco/domain/src/HouseHeating/FuelOilOrderRepositoryInterface';

export class HouseHeatingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher,
              private orderFuelOilRepository: FuelOilOrderRepositoryInterface) {
  }


  get controller() {
    return this.reuseOrInstantiate(
      'HouseHeatingController',
      () => new HouseHeatingController(
        this.fullPresenter,
        this.fullPresenter,
        this.fullPresenter,
        new AddFuelOilOrder(this.orderFuelOilRepository, this.eventDispatcher),
        new GetLastFuelOilOrders(this.orderFuelOilRepository),
        new GetTotalFuelOilOrder(this.orderFuelOilRepository),
      ),
    );
  }

  get ui(): ElectricUI {
    return this.fullPresenter;
  }

  get viewModel() {
    return this.fullPresenter.viewModel;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate('HouseHeatingPresenter', () => new HouseHeatingUIPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
