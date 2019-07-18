import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { GetConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsPresenterInterface';
import { GetConsumptionsResponse } from '@eco/domain/src/Water/UseCase/GetConsumptions/GetConsumptionsResponse';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterPresenterInterface';
import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterResponse';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterUI } from '@eco/frontend-interface-adapter/src/Water/WaterUI';
import {
  ViewModel,
  WaterConsumptionViewModel,
  WaterMeterViewModel,
} from '@eco/frontend-interface-adapter/src/Water/ViewModel';

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
