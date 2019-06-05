import { AddFuelOilOrderController } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderController';
import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { HouseHeatingPresenter } from '@eco/domain/src/HouseHeating/HouseHeatingPresenter';
import { HomeController } from '@eco/domain/src/HouseHeating/UseCase/Home/HomeController';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';

export class HouseHeatingFactory {
  private instances: any = {};

  get addFuelOilOrderPresenter(): AddFuelOilOrderPresenterInterface {
    return this.fullPresenter;
  }

  get addFuelOilOrderController() {
    return this.reuseOrInstantiate(
      AddFuelOilOrderController.name,
      () => new AddFuelOilOrderController(
        new AddFuelOilOrder(this.addFuelOilOrderPresenter),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  get homeController() {
    return this.reuseOrInstantiate(
      HomeController.name,
      () => new HomeController(
        new GetLastFuelOilOrders(this.homePresenter),
        new GetTotalFuelOilOrder(this.homePresenter),
      ),
    );
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
