import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { OrderFuelOilFakeApiRepository } from 'frontend/src/infrastructure/HouseHeating/OrderFuelOilFakeApiRepository';
import { api } from 'frontend/src/infrastructure/Api';
import { HouseHeatingController } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingController';
import { HouseHeatingPresenter } from '@eco/frontend-interface-adapter/src/HouseHeating/HouseHeatingPresenter';

export class HouseHeatingFactory {
  private instances: any = {};

  get addFuelOilOrderPresenter(): AddFuelOilOrderPresenterInterface {
    return this.fullPresenter;
  }


  get controller() {
    return this.reuseOrInstantiate(
      HouseHeatingController.name,
      () => new HouseHeatingController(
        this.addFuelOilOrderPresenter,
        this.homePresenter,
        new AddFuelOilOrder(new OrderFuelOilFakeApiRepository(api)),
        new GetLastFuelOilOrders(new OrderFuelOilFakeApiRepository(api)),
        new GetTotalFuelOilOrder(new OrderFuelOilFakeApiRepository(api)),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate(HouseHeatingPresenter.name, () => new HouseHeatingPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
