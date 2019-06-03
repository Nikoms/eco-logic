import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { InitWaterMeterViewModel } from '@/domain/Water/UseCase/InitWaterMeter/InitWaterMeterViewModel';
import { GetWaterMeterPresenterInterface } from '@/domain/Water/UseCase/GetWaterMeters/GetWaterMeterPresenterInterface';

export class InitWaterPresenter implements GetWaterMeterPresenterInterface {
  private viewModel: InitWaterMeterViewModel;

  constructor() {
    this.viewModel = new InitWaterMeterViewModel();
  }

  getViewModel() {
    return this.viewModel;
  }

  metersInitialized(waterMeters: WaterMeter[]) {
    this.viewModel.meters.push(...waterMeters);
  }

  setMeters(meters: WaterMeter[]): void {
    this.viewModel.meters.push(...meters);
  }
}
