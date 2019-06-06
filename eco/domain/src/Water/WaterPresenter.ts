import { HomePresenterInterface } from '@eco/domain/src/Water/UseCase/Home/HomePresenterInterface';
import { HomeViewModel } from '@eco/domain/src/Water/UseCase/Home/HomeViewModel';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { AddConsumptionPresenterInterface } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionViewModel } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { GetWaterMetersPresenterInterface } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersPresenterInterface';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';
import { ListConsumptionsPresenterInterface } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsPresenterInterface';
import { ListConsumptionsViewModel } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsViewModel';
import { ListConsumptionsResponse } from '@eco/domain/src/Water/UseCase/ListConsumptions/ListConsumptionsResponse';
import { GetWaterMetersResponse } from '@eco/domain/src/Water/UseCase/GetWaterMeters/GetWaterMetersResponse';

export class WaterPresenter implements GetWaterMetersPresenterInterface,
  HomePresenterInterface,
  AddConsumptionPresenterInterface, ListConsumptionsPresenterInterface {

  private addConsumptionViewModel = new AddConsumptionViewModel();
  private homeViewModel = new HomeViewModel();
  private listConsumptionsViewModel = new ListConsumptionsViewModel();
  private meters: WaterMeter[] = [];

  getViewModel(): ListConsumptionsViewModel {
    return this.listConsumptionsViewModel;
  }

  presentListConsumptionsResponse(response: ListConsumptionsResponse): void {
    this.listConsumptionsViewModel.consumptions = response.consumptions;
  }

  getHomeViewModel(): HomeViewModel {
    return this.homeViewModel;
  }

  presentGetWaterMeters(response: GetWaterMetersResponse): void {
    this.meters = response.meters;
    this.homeViewModel.hasMeter = this.meters.length > 0;

    this.addConsumptionViewModel.meters = this.meters;
    this.addConsumptionViewModel.hasMeters = this.meters.length > 0;
  }

  presentAddConsumption(response: AddConsumptionResponse): void {
    this.listConsumptionsViewModel.consumptions.push(...response.consumptions);
    this.addConsumptionViewModel.displayed = false;
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
}
