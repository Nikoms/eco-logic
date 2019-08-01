import { ElectricityController } from './ElectricityController';
import { ElectricityUIPresenter } from './ElectricityUIPresenter';
import { EventDispatcher } from '@eco/shared-kernel';
import {
  ElectricityMeterRepositoryInterface,
  GetElectricMeters,
  SaveElectricMeter,
  UpdatePowerConsumption,
} from '@eco/domain';
import { ElectricUI } from './ElectricUI';

export class ElectricityFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventDispatcher,
              private electricityMeterRepository: ElectricityMeterRepositoryInterface) {

  }

  get controller() {
    return this.reuseOrInstantiate(
      'ElectricityController',
      () => new ElectricityController(
        this.fullPresenter,
        this.fullPresenter,
        this.fullPresenter,
        new GetElectricMeters(this.electricityMeterRepository),
        new SaveElectricMeter(this.electricityMeterRepository),
        new UpdatePowerConsumption(this.electricityMeterRepository, this.eventDispatcher),
      ),
    );
  }

  get ui(): ElectricUI {
    return this.fullPresenter;
  }

  get viewModel() {
    return this.fullPresenter.viewModel;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate('ElectricityPresenter', () => new ElectricityUIPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
