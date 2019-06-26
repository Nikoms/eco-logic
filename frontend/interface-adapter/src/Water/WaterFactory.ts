import { AddConsumption } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumption';
import { AddWaterMeter } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeter';
import { GetWaterMeters } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMeters';
import { GetConsumptions } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptions';
import { WaterController } from './WaterController';
import { WaterUIPresenter } from '@eco/frontend-interface-adapter/src/Water/WaterUIPresenter';
import { WaterMeterRepositoryInterface } from '@eco/domain/src/Water/UseCase/WaterMeterRepositoryInterface';
import { ConsumptionRepositoryInterface } from '@eco/domain/src/Water/UseCase/ConsumptionRepositoryInterface';

export class WaterFactory {
  private instances: any = {};

  constructor(private waterRepository: WaterMeterRepositoryInterface,
              private consumptionRepository: ConsumptionRepositoryInterface) {
  }

  get controller() {
    return this.reuseOrInstantiate(
      'WaterController',
      () => new WaterController(
        this.presenter,
        this.presenter,
        this.presenter,
        this.presenter,
        new AddConsumption(this.consumptionRepository),
        new AddWaterMeter(this.waterRepository),
        new GetWaterMeters(this.waterRepository),
        new GetConsumptions(this.consumptionRepository),
      ),
    );
  }

  get presenter(): WaterUIPresenter {
    return this.reuseOrInstantiate('WaterPresenter', () => new WaterUIPresenter());
  }

  get viewModel() {
    return this.presenter.viewModel;
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
