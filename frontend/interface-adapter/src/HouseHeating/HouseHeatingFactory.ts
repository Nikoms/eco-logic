import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { HouseHeatingController } from './HouseHeatingController';
import { OrderFuelOilFakeApiRepository } from '@eco/frontend-infrastructure/src/HouseHeating/OrderFuelOilFakeApiRepository';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { HouseHeatingUIPresenter } from './HouseHeatingUIPresenter';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/HouseHeating/ElectricUI';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';

export class HouseHeatingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher) {
  }

  get controller() {
    return this.reuseOrInstantiate(
      'HouseHeatingController',
      () => new HouseHeatingController(
        this.fullPresenter,
        this.fullPresenter,
        this.fullPresenter,
        new AddFuelOilOrder(new OrderFuelOilFakeApiRepository(api), this.eventDispatcher),
        new GetLastFuelOilOrders(new OrderFuelOilFakeApiRepository(api)),
        new GetTotalFuelOilOrder(new OrderFuelOilFakeApiRepository(api)),
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
