import { UpdatePowerConsumptionPresenterInterface } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionPresenterInterface';
import { GetElectricMetersPresenterInterface } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersPresenterInterface';
import { SaveElectricMeterPresenterInterface } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterPresenterInterface';
import { GetElectricMetersResponse } from '@eco/domain/src/Electricity/UseCase/GetElectricMeters/GetElectricMetersResponse';
import { SaveElectricMeterResponse } from '@eco/domain/src/Electricity/UseCase/SaveElectricMeter/SaveElectricMeterResponse';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';
import { ElectricMeter } from '@eco/domain/src/Electricity/Entity/ElectricMeter';
import { ElectricUI } from '@eco/frontend-interface-adapter/src/Electricity/ElectricUI';
import { ElectricViewModel, ViewModel } from '@eco/frontend-interface-adapter/src/Electricity/ViewModel';

export class ElectricityUIPresenter implements ElectricUI,
  UpdatePowerConsumptionPresenterInterface,
  GetElectricMetersPresenterInterface,
  SaveElectricMeterPresenterInterface {

  private _viewModel = new ViewModel();
  private meters: ElectricMeter[] = [];

  get viewModel() {
    return this._viewModel;
  }

  showUpdatePowerConsumption(electricViewModel: ElectricViewModel): void {
    this.viewModel.selectedMeter = electricViewModel;
    this.viewModel.isFormDisplayed = true;
  }

  cancelUpdatePowerConsumption(): void {
    this.viewModel.isFormDisplayed = false;
    this.viewModel.selectedMeter = undefined;
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
      this.viewModel.selectedMeter = undefined;
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

  private updateMetersViewModel() {
    this.viewModel.meters = this.meters.map((electricMeter) => {
      return new ElectricViewModel(
        electricMeter.id,
        electricMeter.name,
        electricMeter.kWh + ' kWh',
        electricMeter.lastKWhUpdate.toLocaleDateString('fr'),
      );
    });
    this.viewModel.hasMeter = this.meters.length > 0;
  }
}
