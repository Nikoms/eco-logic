import { AddConsumptionViewModel } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { WaterConsumption } from '@eco/core-water/src/entity/WaterConsumption';

export interface AddConsumptionPresenterInterface {
  getAddConsumptionViewModel(): AddConsumptionViewModel;

  allConsumptionsSaved(consumptions: WaterConsumption[]): void;

  showAddWaterConsumption(): void;
}
