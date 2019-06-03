import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { HomeViewModel } from '@/domain/Water/UseCase/Home/HomeViewModel';

export class HomePresenter {
  private viewModel: HomeViewModel;

  constructor() {
    this.viewModel = new HomeViewModel();
  }

  setMeters(meters: WaterMeter[]): any {
    this.viewModel.meters = meters;
    this.viewModel.hasMeter = meters.length > 0;
  }

  getHomeViewModel(): HomeViewModel {
    return this.viewModel;
  }
}
