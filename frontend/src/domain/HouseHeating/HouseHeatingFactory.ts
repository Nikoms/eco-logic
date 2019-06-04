import { AddFuelOilOrderController } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderController';
import { AddFuelOilOrder } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { HouseHeatingPresenter } from '@/domain/HouseHeating/HouseHeatingPresenter';
import { HomeController } from '@/domain/HouseHeating/UseCase/Home/HomeController';
import { GetLastFuelOilOrders } from '@/domain/HouseHeating/UseCase/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@/domain/HouseHeating/UseCase/GetTotalFuelOilOrder';
import { AddFuelOilOrderPresenterInterface } from '@/domain/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { HomePresenterInterface } from '@/domain/HouseHeating/UseCase/Home/HomePresenterInterface';

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
