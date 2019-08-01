import {
  AddConsumption,
  AddWaterMeter,
  ConsumptionRepositoryInterface,
  GetConsumptions,
  GetWaterMeters,
  WaterMeterRepositoryInterface,
} from '@eco/domain';
import { WaterController } from './WaterController';
import { WaterUIPresenter } from './WaterUIPresenter';
import { ViewModel } from './ViewModel';

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

  get viewModel(): ViewModel {
    return this.presenter.viewModel;
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
