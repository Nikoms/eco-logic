import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricityController } from './ElectricityController';
import { ElectricityUIPresenter } from './ElectricityUIPresenter';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/Electricity/ElectricUI';
import { ElectricityMeterRepositoryInterface } from '@eco/domain/src/Electricity/Repository/ElectricityMeterRepositoryInterface';

export class ElectricityFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher,
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
