import { HomePresenter } from '@/domain/Water/UseCase/Home/HomePresenter';
import { AddConsumptionController } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionController';
import { AddConsumptionPresenter } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionPresenter';
import { AddConsumption } from '@/domain/Water/UseCase/AddConsumption/AddConsumption';
import { InitWaterMeterController } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeterController';
import { InitWaterMeter } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { InitWaterPresenter } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterPresenter';
import { GetWaterMeters } from '@/domain/Water/UseCase/GetWaterMeters/GetWaterMeters';

export class WaterFactory {
  private instances: any = {};

  get initWaterMeterPresenter() {
    return this.reuseOrInstantiate(InitWaterPresenter.name, () => new InitWaterPresenter());
  }

  get initWaterMeterController() {
    return this.reuseOrInstantiate(
      InitWaterMeterController.name,
      () => new InitWaterMeterController(
        new InitWaterMeter(this.initWaterMeterPresenter),
        new GetWaterMeters(this.initWaterMeterPresenter),
      ),
    );

  }

  get homePresenter() {
    return this.reuseOrInstantiate(HomePresenter.name, () => new HomePresenter());
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
