import { ListConsumptionsViewModel } from '@/domain/Water/UseCase/ListConsumptions/ListConsumptionsViewModel';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export class ListConsumptionsPresenter {
  private viewModel: ListConsumptionsViewModel;

  constructor() {
    this.viewModel = new ListConsumptionsViewModel();
  }

  getViewModel(): ListConsumptionsViewModel {
    return this.viewModel;
  }

  setConsumptions(consumptions: WaterConsumption[]) {
    this.viewModel.consumptions = consumptions;
  }
}
