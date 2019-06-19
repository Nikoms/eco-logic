import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/Electricity/ElectricUI';
import { ViewModel } from '@eco/frontend-interface-adapter/src/Electricity/ViewModel';

export class ElectricityUIPresenter implements ElectricUI,
  UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  GetElectricMeterPresenterInterface,
  SaveElectricMeterPresenterInterface {

  private _viewModel = new ViewModel();
  private meters: ElectricMeter[] = [];

  get viewModel() {
    return this._viewModel;
  }

  showUpdatePowerConsumption(electricMeter: ElectricMeter): void {
    this.viewModel.lastKWh = `${electricMeter.kWh}`;
    this.viewModel.meterName = `${electricMeter.name}`;
    this.viewModel.electricMeterId = electricMeter.id;
    this.viewModel.isFormDisplayed = true;
  }

  cancelUpdatePowerConsumption(): void {
    this.viewModel.isFormDisplayed = false;
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

      this.viewModel.isFormDisplayed = false;
    }
  }

  presentGetElectricMeters(response: GetElectricMetersResponse): void {
    this.meters = response.electricMeters;
    this.updateMetersViewModel();
  }

  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void {
    this.meters.push(response.meter);
    this.updateMetersViewModel();
  }

  presentGetElectricMeter(response: GetElectricMeterResponse): void {
    this.viewModel.meter = response.electricMeter;
  }

  private updateMetersViewModel() {
    this.viewModel.meters = this.meters;
    this.viewModel.hasMeter = this.meters.length > 0;
  }
}
