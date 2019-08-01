import {
  AddConsumptionPresenterInterface,
  AddConsumptionResponse,
  AddWaterMeterPresenterInterface,
  AddWaterMeterResponse,
  GetConsumptionsPresenterInterface,
  GetConsumptionsResponse,
  GetWaterMetersPresenterInterface,
  GetWaterMetersResponse,
  WaterConsumption,
  WaterMeter,
} from '../../../eco/domain';
import { WaterUI } from './WaterUI';
import { ViewModel, WaterConsumptionViewModel, WaterMeterViewModel } from './ViewModel';

export class WaterUIPresenter implements GetWaterMetersPresenterInterface,
  AddConsumptionPresenterInterface,
  GetConsumptionsPresenterInterface,
  AddWaterMeterPresenterInterface,
  WaterUI {

  private _viewModel = new ViewModel();
  private meters: WaterMeter[] = [];
  private _consumptions: WaterConsumption[] = [];

  get viewModel() {
    return this._viewModel;
  }

  presentGetConsumptionsResponse(response: GetConsumptionsResponse): void {
    this._consumptions = response.consumptions;
    this.updateViewConsumptions();
  }

  presentGetWaterMeters(response: GetWaterMetersResponse): void {
    this.meters = response.meters;
    this.metersUpdated();
  }

  presentAddConsumption(response: AddConsumptionResponse): void {
    if (response.isConsumptionInvalid) {
      console.error('isConsumptionInvalid');
    }

    if (response.consumption) {
      this._consumptions.unshift(response.consumption);
      this.updateViewConsumptions();
      this.viewModel.update({ displayed: false });
    }
  }

  showAddWaterConsumption(): void {
    this.viewModel.update({ displayed: true });
    if (!this.viewModel.hasMeters) {
      this.viewModel.update({ errorMessage: 'Please add a water meter before adding (TODO, but in INIT app)' });
    }
  }

  hideAddWaterConsumption(): void {
    this.viewModel.update({ displayed: false });
  }

  presentAddWaterMeter(response: AddWaterMeterResponse): void {
    if (response.isNameInvalid) {
      console.error('isNameInvalid');
    }
    if (response.meter !== undefined) {
      this.meters.push(response.meter);
      this.metersUpdated();
    }
  }

  private updateViewConsumptions() {
    this.viewModel.update({
      consumptions: this._consumptions
        .map(c => new WaterConsumptionViewModel(c.waterMeterId, c.m3 + ' m3', c.date.toLocaleDateString('fr'))),
    });
  }

  private metersUpdated() {
    this.viewModel.update({
      hasMeter: this.meters.length > 0,
      hasMeters: this.meters.length > 0,
      meters: this.meters.map(e => new WaterMeterViewModel(e.id, e.name)),
    });
  }
}
