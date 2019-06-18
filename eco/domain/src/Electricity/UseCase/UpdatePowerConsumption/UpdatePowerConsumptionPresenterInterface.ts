import { UpdatePowerConsumptionResponse } from '@eco/domain/src/Electricity/UseCase/UpdatePowerConsumption/UpdatePowerConsumptionResponse';

export interface UpdatePowerConsumptionPresenterInterface {
  presentUpdatePowerConsumption(response: UpdatePowerConsumptionResponse): void;
}
