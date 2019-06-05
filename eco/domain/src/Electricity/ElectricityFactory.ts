import { ElectricityPresenter } from '@eco/domain/src/Electricity/ElectricityPresenter';
import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { HomeController } from '@eco/domain/src/Electricity/UseCase/Home/HomeController';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionController } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionController';
import { UpdatePowerConsumption } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { InitElectricMetersController } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersController';
import { InitElectricsMeter } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';

export class ElectricityFactory {
  private instances: any = {};

  get homeController() {
    return this.reuseOrInstantiate(
      HomeController.name,
      () => new HomeController(new GetElectricMeters(this.getElectricMetersPresenter)),
    );
  }

  get homePresenter(): HomePresenterInterface {
    return this.fullPresenter;
  }

  get initElectricMetersController() {
    return this.reuseOrInstantiate(
      InitElectricMetersController.name,
      () => new InitElectricMetersController(
        new InitElectricsMeter(this.initElectricMetersPresenter),
      ),
    );
  }

  get initElectricMetersPresenter(): InitElectricMetersPresenterInterface {
    return this.fullPresenter;
  }

  get getElectricMetersPresenter(): GetElectricMetersPresenterInterface {
    return this.fullPresenter;
  }

  get updatePowerConsumptionController() {
    return this.reuseOrInstantiate(
      UpdatePowerConsumptionController.name,
      () => new UpdatePowerConsumptionController(
        new UpdatePowerConsumption(this.updatePowerConsumptionPresenter),
      ),
    );
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
