import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { SaveElectricMeter } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeter';
import { ElectricityController } from './ElectricityController';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { ElectricityPresenter } from './ElectricityPresenter';
import { EventTargetEventDispatcher } from '@eco/infrastructure/src/event/EventDispatcher';
import { ElectricMeterLocalStorageRepository2 } from '@eco/infrastructure/src/local-storage/ElectricMeterLocalStorageRepository2';

export class ElectricityFactory {
  private instances: any = {};

  constructor(private eventDispatcher: EventTargetEventDispatcher) {

  }

  get controller() {
    const electricityMeterFakeApiRepository = new ElectricityMeterFakeApiRepository(
      api,
      new ElectricMeterLocalStorageRepository2(window.localStorage),
    );
    return this.reuseOrInstantiate(
      'ElectricityController',
      () => new ElectricityController(
        this.getElectricMetersPresenter,
        this.initElectricMetersPresenter,
        this.updatePowerConsumptionPresenter,
        new GetElectricMeters(electricityMeterFakeApiRepository),
        new SaveElectricMeter(electricityMeterFakeApiRepository),
        new UpdatePowerConsumption(electricityMeterFakeApiRepository, this.eventDispatcher),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  get initElectricMetersPresenter(): SaveElectricMeterPresenterInterface {
    return this.fullPresenter;
  }

  get getElectricMetersPresenter(): GetElectricMetersPresenterInterface {
    return this.fullPresenter;
  }

  get updatePowerConsumptionPresenter(): UpdatePowerConsumptionPresenterInterface {
    return this.fullPresenter;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate('ElectricityPresenter', () => new ElectricityPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
