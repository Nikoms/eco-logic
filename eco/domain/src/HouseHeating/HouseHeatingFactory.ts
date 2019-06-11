import { AddFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrder';
import { HouseHeatingPresenter } from '@eco/domain/src/HouseHeating/HouseHeatingPresenter';
import { AddFuelOilOrderPresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/AddFuelOilOrder/AddFuelOilOrderPresenterInterface';
import { HomePresenterInterface } from '@eco/domain/src/HouseHeating/UseCase/Home/HomePresenterInterface';
import { GetLastFuelOilOrders } from '@eco/domain/src/HouseHeating/UseCase/GetLastFuelOilOrder/GetLastFuelOilOrder';
import { GetTotalFuelOilOrder } from '@eco/domain/src/HouseHeating/UseCase/GetTotalFuelOilOrder/GetTotalFuelOilOrder';
import { HouseHeatingController } from '@eco/domain/src/HouseHeating/HouseHeatingController';
import { api } from '@eco/domain/src/Temp/Api';

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
        new AddFuelOilOrder(api),
        new GetLastFuelOilOrders(api),
        new GetTotalFuelOilOrder(api),
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
