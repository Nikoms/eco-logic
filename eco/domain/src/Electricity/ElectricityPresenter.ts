import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { PowerConsumption } from '@eco/core-electricity/src/entity/PowerConsumption';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { InitElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/InitElectricMeters/InitElectricMetersPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';

export class ElectricityPresenter implements HomePresenterInterface,
  UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  InitElectricMetersPresenterInterface {

  private updatePowerConsumptionViewModel = new UpdatePowerConsumptionViewModel();
  private getElectricMetersViewModel = new GetElectricMetersViewModel();
  private meters: ElectricMeter[] = [];

  showUpdatePowerConsumption(electricMeter: ElectricMeter): void {
    this.updatePowerConsumptionViewModel.lastKWh = `${electricMeter.kWh}`;
    this.updatePowerConsumptionViewModel.meterName = `${electricMeter.name}`;
    this.updatePowerConsumptionViewModel.electricMeterId = electricMeter.id;
    this.updatePowerConsumptionViewModel.displayed = true;
  }

  cancelUpdatePowerConsumption(): void {
    this.updatePowerConsumptionViewModel.displayed = false;
  }

  getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel {
    return this.updatePowerConsumptionViewModel;
  }

  electricMeterIsUnknown(): void {
    console.error('kWhIsNotAValidNumber');
  }

  kWhIsEmpty(): void {
    console.error('kWhIsNotAValidNumber');
  }

  kWhIsNotAValidNumber(): void {
    console.error('kWhIsNotAValidNumber');
  }

  powerConsumptionSaved(powerConsumption: PowerConsumption): void {
    for (const eletricMeter of this.meters) {
      if (eletricMeter.id === powerConsumption.electricMeterId) {
        eletricMeter.updateKwh(powerConsumption.kWh, powerConsumption.date);
        break;
      }
    }
    this.updateMetersViewModel();

    this.updatePowerConsumptionViewModel.displayed = false;
  }

  presentGetElectricMeters(response: GetElectricMetersResponse): void {
    this.meters = response.electricMeters;
    this.updateMetersViewModel();
  }

  getGetElectricMetersViewModel(): GetElectricMetersViewModel {
    return this.getElectricMetersViewModel;
  }

  electricMetersInitialized(electricMeters: ElectricMeter[]): void {
    this.meters = electricMeters;
    this.updateMetersViewModel();
  }

  private updateMetersViewModel() {
    this.getElectricMetersViewModel.meters = this.meters;
    this.getElectricMetersViewModel.hasMeter = this.meters.length > 0;
  }
}
