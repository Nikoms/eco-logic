import { ElectricityPresenter } from '@eco/domain/src/Electricity/ElectricityPresenter';
import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { InitElectricsMeter } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';
import { ElectricityController } from '@eco/domain/src/Electricity/ElectricityController';

export class ElectricityFactory {
  private instances: any = {};

  get controller() {
    return this.reuseOrInstantiate(
      ElectricityController.name,
      () => new ElectricityController(
        new GetElectricMeters(this.getElectricMetersPresenter),
        new InitElectricsMeter(this.initElectricMetersPresenter),
        new UpdatePowerConsumption(this.updatePowerConsumptionPresenter),
      ),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  get initElectricMetersPresenter(): InitElectricMetersPresenterInterface {
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
