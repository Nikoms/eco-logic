import { ElectricityPresenter } from '@/domain/Electricity/ElectricityPresenter';
import { HomePresenterInterface } from '@/domain/Electricity/UseCase/Home/HomePresenterInterface';
import { HomeController } from '@/domain/Electricity/UseCase/Home/HomeController';
import { UpdatePowerConsumptionPresenterInterface } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionController } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionController';
import { UpdatePowerConsumption } from '@/domain/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumption';
import { GetElectricMetersPresenterInterface } from '@/domain/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMeters } from '@/domain/Electricity/UseCase/GetElectricMeters/GetElectricMeters';
import { InitElectricMetersPresenterInterface } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { InitElectricMetersController } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricMetersController';
import { InitElectricsMeter } from '@/domain/Electricity/UseCase/InitElectricMeters/InitElectricsMeter';

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
