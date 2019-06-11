import { HomePresenterInterface } from '@eco/domain/src/Electricity/UseCase/Home/HomePresenterInterface';
import { ElectricMeter } from '@eco/core-electricity/src/entity/ElectricMeter';
import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { AddElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { AddElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/AddElectricMeter/AddElectricMeterResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';

export class ElectricityPresenter implements HomePresenterInterface,
  UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  AddElectricMeterPresenterInterface {

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

  presentUpdatePowerConsumption(response: UpdatePowerConsumptionResponse): void {
    if (response.isElectricMeterUnknown) {
      console.error('isElectricMeterUnknown');
    }
    if (response.iskWhEmpty) {
      console.error('iskWhEmpty');
    }
    if (response.isKwhInvalid) {
      console.error('isKwhInvalid');
    }

    if (response.newPowerConsumption !== undefined) {
      for (const electricMeter of this.meters) {
        if (electricMeter.id === response.newPowerConsumption.electricMeterId) {
          electricMeter.updateKwh(response.newPowerConsumption.kWh, response.newPowerConsumption.date);
          break;
        }
      }
      this.updateMetersViewModel();

      this.updatePowerConsumptionViewModel.displayed = false;
    }
  }

  presentGetElectricMeters(response: GetElectricMetersResponse): void {
    this.meters = response.electricMeters;
    this.updateMetersViewModel();
  }

  getGetElectricMetersViewModel(): GetElectricMetersViewModel {
    return this.getElectricMetersViewModel;
  }

  presentAddElectricMeterResponse(response: AddElectricMeterResponse): void {
    this.meters.push(response.meter);
    this.updateMetersViewModel();
  }

  private updateMetersViewModel() {
    this.getElectricMetersViewModel.meters = this.meters;
    this.getElectricMetersViewModel.hasMeter = this.meters.length > 0;
  }
}
