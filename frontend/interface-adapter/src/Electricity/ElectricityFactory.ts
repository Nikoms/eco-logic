import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { AddElectricMeter } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeter';
import { ElectricityController } from './ElectricityController';
import { ElectricityMeterFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/ElectricityMeterFakeApiRepository';
import { PowerConsumptionFakeApiRepository } from '@eco/frontend-infrastructure/src/Electricity/PowerConsumptionFakeApiRepository';
import { api } from '@eco/frontend-infrastructure/src/Api';
import { ElectricityPresenter } from './ElectricityPresenter';

export class ElectricityFactory {
  private instances: any = {};

  get controller() {
    return this.reuseOrInstantiate(
      ElectricityController.name,
      () => new ElectricityController(
        this.getElectricMetersPresenter,
        this.initElectricMetersPresenter,
        this.updatePowerConsumptionPresenter,
        new GetElectricMeters(new ElectricityMeterFakeApiRepository(api)),
        new AddElectricMeter(new ElectricityMeterFakeApiRepository(api)),
        new UpdatePowerConsumption(new PowerConsumptionFakeApiRepository(api)),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  get initElectricMetersPresenter(): AddElectricMeterPresenterInterface {
    return this.fullPresenter;
  }

  get getElectricMetersPresenter(): GetElectricMetersPresenterInterface {
    return this.fullPresenter;
  }

  get updatePowerConsumptionPresenter(): UpdatePowerConsumptionPresenterInterface {
    return this.fullPresenter;
  }

  private get fullPresenter() {
    return this.reuseOrInstantiate(ElectricityPresenter.name, () => new ElectricityPresenter());
  }

  private reuseOrInstantiate<T>(id: string, callback: () => T): T {
    if (this.instances[id] === undefined) {
      this.instances[id] = callback();
    }
    return this.instances[id];
  }
}
