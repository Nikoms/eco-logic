import { UpdatePowerConsumptionViewModel } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionViewModel';
import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';

export interface UpdatePowerConsumptionPresenterInterface {
  cancelUpdatePowerConsumption(): void;

  getUpdatePowerConsumptionViewModel(): UpdatePowerConsumptionViewModel;

  presentUpdatePowerConsumption(response: UpdatePowerConsumptionResponse): void;
}
