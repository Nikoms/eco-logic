import { HomeController } from '@/domain/Water/UseCase/Home/HomeController';
import { GetWaterMeters } from '@/domain/Water/UseCase/GetWaterMeters';
import { HomePresenter } from '@/domain/Water/UseCase/Home/HomePresenter';

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

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
