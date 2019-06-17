import { HomePresenterInterface } from '@eco/domain/src/Water/UseCase/Home/HomePresenterInterface';
import { HomeViewModel } from '@eco/domain/src/Water/UseCase/Home/HomeViewModel';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionViewModel } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { ListConsumptionsViewModel } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsViewModel';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';
import { AddWaterMeterPresenterInterface } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterPresenterInterface';
import { AddWaterMeterResponse } from '@eco/domain/src/Water/UseCase/AddWaterMeter/AddWaterMeterResponse';
import { WaterMeter } from '@eco/domain/src/Water/Entity/WaterMeter';
import { WaterConsumption } from '@eco/domain/src/Water/Entity/WaterConsumption';
import { WaterUI } from '@eco/frontend-interface-adapter/src/Water/WaterUI';

export class WaterPresenter implements GetWaterMetersPresenterInterface,
  HomePresenterInterface,
  AddConsumptionPresenterInterface,
  ListConsumptionsPresenterInterface,
  AddWaterMeterPresenterInterface,
  WaterUI {

  private addConsumptionViewModel = new AddConsumptionViewModel();
  private homeViewModel = new HomeViewModel();
  private listConsumptionsViewModel = new ListConsumptionsViewModel();
  private meters: WaterMeter[] = [];
  private _consumptions: WaterConsumption[] = [];

  get waterConsumptions() {
    return this._consumptions;
  }

  get waterMeters() {
    return this.meters;
  }

  getViewModel(): ListConsumptionsViewModel {
    return this.listConsumptionsViewModel;
  }

  presentListConsumptionsResponse(response: ListConsumptionsResponse): void {
    this._consumptions = response.consumptions;
    this.listConsumptionsViewModel.consumptions = this._consumptions;
  }

  getHomeViewModel(): HomeViewModel {
    return this.homeViewModel;
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
      this.listConsumptionsViewModel.consumptions.push(response.consumption);
      this.addConsumptionViewModel.displayed = false;
    }
  }

  getAddConsumptionViewModel(): AddConsumptionViewModel {
    return this.addConsumptionViewModel;
  }

  showAddWaterConsumption(): void {
    this.addConsumptionViewModel.displayed = true;
    if (!this.addConsumptionViewModel.hasMeters) {
      this.addConsumptionViewModel.errorMessage = 'Please add a water meter before adding (TODO, but in INIT app)';
    }
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

  private metersUpdated() {
    this.homeViewModel.hasMeter = this.meters.length > 0;

    this.addConsumptionViewModel.meters = this.meters;
    this.addConsumptionViewModel.hasMeters = this.meters.length > 0;
  }
}
