import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { GetTotalFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrderPresenterInterface';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { HouseHeatingController } from './HouseHeatingController';
import { OrderFuelOilFakeApiRepository } from '@eco/frontend-infrastructure/src/HouseHeating/OrderFuelOilFakeApiRepository';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { HouseHeatingPresenter } from './HouseHeatingPresenter';
import { GetLastFuelOilOrdersPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrders/GetLastFuelOilOrdersPresenterInterface';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/HouseHeating/ElectricUI';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';

export class HouseHeatingFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher) {
  }

  get addFuelOilOrderPresenter(): AddFuelOilOrderPresenterInterface {
    return this.fullPresenter;
  }

  get lastFuelOilOrdersPresenter(): GetLastFuelOilOrdersPresenterInterface {
    return this.fullPresenter;
  }


  get controller() {
    return this.reuseOrInstantiate(
      'HouseHeatingController',
      () => new HouseHeatingController(
        this.addFuelOilOrderPresenter,
        this.lastFuelOilOrdersPresenter,
        this.getTotalFuelOilOrderPresenter,
        new AddFuelOilOrder(new OrderFuelOilFakeApiRepository(api), this.eventDispatcher),
        new GetLastFuelOilOrders(new OrderFuelOilFakeApiRepository(api)),
        new GetTotalFuelOilOrder(new OrderFuelOilFakeApiRepository(api)),
      ),
    );
  }

  get getTotalFuelOilOrderPresenter(): GetTotalFuelOilOrderPresenterInterface {
    return this.fullPresenter;
  }

  get ui(): ElectricUI {
    return this.fullPresenter;
  }

  get getLastFuelOilOrdersPresenter(): GetLastFuelOilOrdersPresenterInterface {
    return this.lastFuelOilOrdersPresenter;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate('HouseHeatingPresenter', () => new HouseHeatingPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
