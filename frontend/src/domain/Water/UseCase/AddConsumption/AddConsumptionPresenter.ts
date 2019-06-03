import { AddConsumptionViewModel } from '@/domain/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { WaterMeter } from '@eco/core-water/src/entity/WaterMeter';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export class AddConsumptionPresenter {
  private viewModel = new AddConsumptionViewModel();

  getViewModel(): AddConsumptionViewModel {
    return this.viewModel;
  }

  allConsumptionsSaved(consumptions: WaterConsumption[]) {
    this.viewModel.displayed = false;
  }

  showAddWaterConsumption(meters: WaterMeter[]) {
    this.viewModel.displayed = true;
    this.viewModel.meters = meters;
    this.viewModel.hasMeters = meters.length > 0;
    if (!this.viewModel.hasMeters) {
      this.viewModel.errorMessage = 'Please add a water meter before adding (TODO, but in INIT app)';
    }
  }
}
