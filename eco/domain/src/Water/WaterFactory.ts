import { AddConsumptionController } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionController';
import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { InitWaterMeterController } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeterController';
import { InitWaterMeter } from '@eco/domain/src/Water/UseCase/InitWaterMeter/InitWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { ListConsumptionsController } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsController';
import { ListConsumptions } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptions';
import { HomePresenterInterface } from '@eco/domain/src/Water/UseCase/Home/HomePresenterInterface';
import { WaterPresenter } from '@eco/domain/src/Water/WaterPresenter';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';

export class WaterFactory {
  private instances: any = {};

  get getWaterMeterPresenterInterface(): GetWaterMetersPresenterInterface {
    return this.waterPresenter;
  }

  get initWaterMeterController() {
    return this.reuseOrInstantiate(
      InitWaterMeterController.name,
      () => new InitWaterMeterController(
        new InitWaterMeter(this.getWaterMeterPresenterInterface),
        new GetWaterMeters(this.getWaterMeterPresenterInterface),
      ),
    );
  }

  get listConsumptionsPresenter(): ListConsumptionsPresenterInterface {
    return this.waterPresenter;
  }

  get listConsumptionsController() {
    return this.reuseOrInstantiate(
      ListConsumptionsController.name,
      () => new ListConsumptionsController(
        new ListConsumptions(this.listConsumptionsPresenter),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.waterPresenter;
  }

  get addConsumptionPresenter(): AddConsumptionPresenterInterface {
    return this.waterPresenter;
  }

  get addConsumptionController() {
    return this.reuseOrInstantiate(
      AddConsumptionController.name,
      () => new AddConsumptionController(new AddConsumption(this.addConsumptionPresenter)),
    );
  }

  private get waterPresenter(): WaterPresenter {
    return this.reuseOrInstantiate(WaterPresenter.name, () => new WaterPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
