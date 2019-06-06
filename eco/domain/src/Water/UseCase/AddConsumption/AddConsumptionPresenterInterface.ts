import { AddConsumptionViewModel } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionViewModel';
import { AddConsumptionResponse } from '@eco/domain/src/Water/UseCase/AddConsumption/AddConsumptionResponse';

export interface AddConsumptionPresenterInterface {
  getAddConsumptionViewModel(): AddConsumptionViewModel;

  presentAddConsumption(response: AddConsumptionResponse): void;

  showAddWaterConsumption(): void;
}
