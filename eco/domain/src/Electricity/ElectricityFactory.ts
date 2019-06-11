import { ElectricityPresenter } from '@eco/domain/src/Electricity/ElectricityPresenter';
import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { AddElectricMeter } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeter';
import { ElectricityController } from '@eco/domain/src/Electricity/ElectricityController';
import { api } from '@eco/domain/src/Temp/Api';
import { ElectricityMeterFakeApiRepository } from 'frontend/src/infrastructure/Electricity/ElectricityMeterFakeApiRepository';
import { PowerConsumptionFakeApiRepository } from 'frontend/src/infrastructure/Electricity/PowerConsumptionFakeApiRepository';

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
