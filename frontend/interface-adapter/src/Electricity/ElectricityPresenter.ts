import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { GetElectricMetersViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersViewModel';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { GetElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterPresenterInterface';
import { GetElectricMeterViewModel } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterViewModel';
import { GetElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeter/GetElectricMeterResponse';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/Electricity/ElectricUI';
import { ElectricityPresenterToViewModel } from '@eco/frontend-interface-adapter/src/Electricity/ElectricityPresenterToViewModel';

export class ElectricityPresenter implements ElectricUI,
  UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  GetElectricMeterPresenterInterface,
  SaveElectricMeterPresenterInterface,
  ElectricityPresenterToViewModel {

  private updatePowerConsumptionViewModel = new UpdatePowerConsumptionViewModel();
  private getElectricMetersViewModel = new GetElectricMetersViewModel();
  private getElectricMeterViewModel = new GetElectricMeterViewModel();
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

  presentAddElectricMeterResponse(response: SaveElectricMeterResponse): void {
    this.meters.push(response.meter);
    this.updateMetersViewModel();
  }

  presentGetElectricMeter(response: GetElectricMeterResponse): void {
    this.getElectricMeterViewModel.meter = response.electricMeter;
  }

  private updateMetersViewModel() {
    this.getElectricMetersViewModel.meters = this.meters;
    this.getElectricMetersViewModel.hasMeter = this.meters.length > 0;
  }
}
