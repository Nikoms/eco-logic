import { HomePresenterInterface } from '@/domain/Water/UseCase/Home/HomePresenterInterface';
import { HomeViewModel } from '@/domain/Water/UseCase/Home/HomeViewModel';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { AddConsumptionPresenterInterface } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionPresenterInterface';
import { AddConsumptionViewModel } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';
import { GetWaterMeterPresenterInterface } from '@/domain/Water/UseCase/GetWaterMeters/GetWaterMeterPresenterInterface';

export class WaterPresenter implements GetWaterMeterPresenterInterface,
  HomePresenterInterface,
  AddConsumptionPresenterInterface {

  private addConsumptionViewModel = new AddConsumptionViewModel();
  private homeViewModel = new HomeViewModel();
  private meters: WaterMeter[] = [];

  getHomeViewModel(): HomeViewModel {
    return this.homeViewModel;
  }

  setMeters(meters: WaterMeter[]): void {
    this.meters = meters;
    this.homeViewModel.hasMeter = this.meters.length > 0;
    this.addConsumptionViewModel.meters = this.meters;
    this.addConsumptionViewModel.hasMeters = this.meters.length > 0;
  }

  allConsumptionsSaved(consumptions: WaterConsumption[]): void {
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
