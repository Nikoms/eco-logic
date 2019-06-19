import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricityController } from './ElectricityController';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { ElectricityUIPresenter } from './ElectricityUIPresenter';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/Electricity/ElectricUI';

export class ElectricityFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher) {
  }

  get controller() {
    const electricityMeterFakeApiRepository = new ElectricityMeterFakeApiRepository(api);
    return this.reuseOrInstantiate(
      'ElectricityController',
      () => new ElectricityController(
        this.fullPresenter,
        this.fullPresenter,
        this.fullPresenter,
        new GetElectricMeters(electricityMeterFakeApiRepository),
        new SaveElectricMeter(electricityMeterFakeApiRepository),
        new UpdatePowerConsumption(electricityMeterFakeApiRepository, this.eventDispatcher),
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
