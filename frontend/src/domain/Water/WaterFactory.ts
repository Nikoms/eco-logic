import { HomeController } from '@/domain/Water/UseCase/Home/HomeController';
import { GetWaterMeters } from '@/domain/Water/UseCase/GetWaterMeters';
import { HomePresenter } from '@/domain/Water/UseCase/Home/HomePresenter';
import { AddConsumptionController } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionController';
import { AddConsumptionPresenter } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionPresenter';
import { AddConsumption } from '@/domain/Water/UseCase/AddConsumption/AddConsumption';

export class WaterFactory {
  private instances: any = {};

  get homePresenter() {
    return this.reuseOrInstantiate(HomePresenter.name, () => new HomePresenter());
  }

  get homeController() {
    return this.reuseOrInstantiate(
      HomeController.name,
      () => new HomeController(
        new GetWaterMeters(this.homePresenter),
      ),
    );
  }


  get addConsumptionPresenter() {
    return this.reuseOrInstantiate(AddConsumptionPresenter.name, () => new AddConsumptionPresenter());
  }

  get addConsumptionController() {
    return this.reuseOrInstantiate(
      AddConsumptionController.name,
      () => new AddConsumptionController(new AddConsumption(this.addConsumptionPresenter)),
    );
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
